using Glowvitra.Api.Data;
using Glowvitra.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize(Roles = "Admin")]
public class DashboardController(AppDbContext dbContext) : ControllerBase
{
    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var totalProducts = await dbContext.Products.CountAsync();
        var totalOrders = await dbContext.Orders.CountAsync();
        var totalRevenue = await dbContext.Orders.SumAsync(o => (decimal?)o.TotalAmount) ?? 0;
        var totalUsers = await dbContext.Users.CountAsync();

        return Ok(new DashboardSummaryResponse(totalProducts, totalOrders, totalRevenue, totalUsers));
    }
}
