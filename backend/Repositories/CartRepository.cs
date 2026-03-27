using Glowvitra.Api.Data;
using Glowvitra.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Repositories;

public class CartRepository(AppDbContext dbContext) : ICartRepository
{
    public Task<List<CartItem>> GetByUserIdAsync(int userId) =>
        dbContext.CartItems
            .Include(c => c.Product)
            .Where(c => c.UserId == userId)
            .ToListAsync();

    public Task<CartItem?> GetByUserAndProductAsync(int userId, int productId) =>
        dbContext.CartItems.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

    public async Task AddAsync(CartItem item)
    {
        dbContext.CartItems.Add(item);
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(CartItem item)
    {
        dbContext.CartItems.Remove(item);
        await dbContext.SaveChangesAsync();
    }

    public Task SaveChangesAsync() => dbContext.SaveChangesAsync();
}
