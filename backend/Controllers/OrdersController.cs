using System.Security.Claims;
using Glowvitra.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Glowvitra.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class OrdersController(IOrderService orderService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create()
    {
        try
        {
            var userId = GetUserId();
            return Ok(await orderService.CreateAsync(userId));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = GetUserId();
        return Ok(await orderService.GetOrdersAsync(userId));
    }

    private int GetUserId()
    {
        var raw = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "sub")?.Value;
        return int.TryParse(raw, out var userId)
            ? userId
            : throw new UnauthorizedAccessException("Invalid token subject.");
    }
}
