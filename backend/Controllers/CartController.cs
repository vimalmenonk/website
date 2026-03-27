using System.Security.Claims;
using Glowvitra.Api.DTOs;
using Glowvitra.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Glowvitra.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = GetUserId();
        return Ok(await cartService.GetCartAsync(userId));
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody] AddCartItemRequest request)
    {
        var userId = GetUserId();
        await cartService.AddAsync(userId, request);
        return Ok(new { message = "Item added to cart." });
    }

    [HttpDelete("remove")]
    public async Task<IActionResult> Remove([FromBody] RemoveCartItemRequest request)
    {
        var userId = GetUserId();
        var removed = await cartService.RemoveAsync(userId, request.ProductId);
        return removed ? NoContent() : NotFound();
    }

    private int GetUserId()
    {
        var raw = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier || c.Type == "sub")?.Value;
        return int.TryParse(raw, out var userId)
            ? userId
            : throw new UnauthorizedAccessException("Invalid token subject.");
    }
}
