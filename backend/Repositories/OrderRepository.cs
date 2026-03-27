using Glowvitra.Api.Data;
using Glowvitra.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Repositories;

public class OrderRepository(AppDbContext dbContext) : IOrderRepository
{
    public Task<List<Order>> GetByUserIdAsync(int userId) =>
        dbContext.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

    public async Task<Order> AddAsync(Order order)
    {
        dbContext.Orders.Add(order);
        await dbContext.SaveChangesAsync();
        return order;
    }
}
