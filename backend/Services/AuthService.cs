using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Glowvitra.Api.DTOs;
using Glowvitra.Api.Models;
using Glowvitra.Api.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Glowvitra.Api.Services;

public class AuthService(IUserRepository userRepository, IConfiguration configuration, ILogger<AuthService> logger) : IAuthService
{
    private readonly PasswordHasher<User> _passwordHasher = new();

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var existing = await userRepository.GetByEmailAsync(email);
        if (existing is not null)
        {
            throw new InvalidOperationException("Email already registered.");
        }

        var role = request.Role is "Admin" or "Customer" ? request.Role : "Customer";
        var user = new User
        {
            Name = request.Name.Trim(),
            Email = email,
            Role = role,
            IsActive = true
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await userRepository.AddAsync(user);
        logger.LogInformation("[Auth] User registered: {Email} ({Role})", user.Email, user.Role);

        var (token, expiresAt) = GenerateToken(user);
        return new AuthResponse(token, user.Name, user.Email, user.Role, expiresAt);
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await userRepository.GetByEmailAsync(email);
        if (user is null)
        {
            logger.LogWarning("[Auth] Login failed for {Email}: user not found", email);
            return null;
        }

        if (!user.IsActive)
        {
            logger.LogWarning("[Auth] Login failed for {Email}: account inactive", email);
            throw new UnauthorizedAccessException("Account is inactive. Please contact support.");
        }

        var verify = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

        if (verify == PasswordVerificationResult.Failed)
        {
            logger.LogWarning("[Auth] Login failed for {Email}: invalid password", email);
            return null;
        }

        logger.LogInformation("[Auth] Login success: {Email} ({Role})", user.Email, user.Role);
        var (token, expiresAt) = GenerateToken(user);
        return new AuthResponse(token, user.Name, user.Email, user.Role, expiresAt);
    }

    private (string Token, DateTime ExpiresAtUtc) GenerateToken(User user)
    {
        var jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is missing.");
        var issuer = configuration["Jwt:Issuer"] ?? "Glowvitra.Api";
        var audience = configuration["Jwt:Audience"] ?? "Glowvitra.Client";

        var expiresAt = DateTime.UtcNow.AddHours(8);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            notBefore: DateTime.UtcNow,
            expires: expiresAt,
            signingCredentials: creds
        );

        return (new JwtSecurityTokenHandler().WriteToken(token), expiresAt);
    }
}
