using Glowvitra.Api.DTOs;
using Glowvitra.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Glowvitra.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController(IInventoryService inventoryService) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Get() => Ok(await inventoryService.GetAllAsync());

    [HttpPut("update")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update([FromBody] InventoryUpdateRequest request)
    {
        var updated = await inventoryService.UpdateAsync(request);
        return updated ? NoContent() : NotFound();
    }
}
