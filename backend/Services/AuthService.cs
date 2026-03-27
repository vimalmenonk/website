using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Glowvitra.Api.DTOs;
using Glowvitra.Api.Models;
using Glowvitra.Api.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Glowvitra.Api.Services;

public class AuthService(IUserRepository userRepository, IConfiguration configuration) : IAuthService
{
    private readonly PasswordHasher<User> _passwordHasher = new();

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var existing = await userRepository.GetByEmailAsync(request.Email);
        if (existing is not null)
        {
            throw new InvalidOperationException("Email already registered.");
        }

        var role = request.Role is "Admin" or "Customer" ? request.Role : "Customer";
        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            Role = role
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await userRepository.AddAsync(user);

        var token = GenerateToken(user);
        return new AuthResponse(token, user.Name, user.Email, user.Role);
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request)
    {
        var user = await userRepository.GetByEmailAsync(request.Email);
        if (user is null)
        {
            return null;
        }

        var verify = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        var isPlainTextSeedPassword = user.PasswordHash == request.Password;

        if (verify == PasswordVerificationResult.Failed && !isPlainTextSeedPassword)
        {
            return null;
        }

        var token = GenerateToken(user);
        return new AuthResponse(token, user.Name, user.Email, user.Role);
    }

    private string GenerateToken(User user)
    {
        var jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is missing.");
        var issuer = configuration["Jwt:Issuer"] ?? "Glowvitra.Api";
        var audience = configuration["Jwt:Audience"] ?? "Glowvitra.Client";

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
