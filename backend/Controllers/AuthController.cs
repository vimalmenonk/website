using Glowvitra.Api.DTOs;
using Glowvitra.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Glowvitra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IAuthService authService, ILogger<AuthController> logger) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            logger.LogInformation("[AuthController] Register request for {Email}", request.Email);
            var response = await authService.RegisterAsync(request);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            logger.LogWarning("[AuthController] Register rejected for {Email}: {Message}", request.Email, ex.Message);
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        logger.LogInformation("[AuthController] Login attempt for {Email}", request.Email);
        var response = await authService.LoginAsync(request);
        if (response is null)
        {
            logger.LogWarning("[AuthController] Login unauthorized for {Email}", request.Email);
            return Unauthorized(new { message = "Invalid email or password." });
        }

        logger.LogInformation("[AuthController] Login successful for {Email} ({Role})", response.Email, response.Role);
        return Ok(response);
    }
}
