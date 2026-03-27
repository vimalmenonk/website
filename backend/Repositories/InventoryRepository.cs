using Glowvitra.Api.Data;
using Glowvitra.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Repositories;

public class InventoryRepository(AppDbContext dbContext) : IInventoryRepository
{
    public Task<List<Inventory>> GetAllAsync() =>
        dbContext.Inventories.Include(i => i.Product).ToListAsync();

    public Task<Inventory?> GetByProductIdAsync(int productId) =>
        dbContext.Inventories.Include(i => i.Product).FirstOrDefaultAsync(i => i.ProductId == productId);

    public async Task AddAsync(Inventory inventory)
    {
        dbContext.Inventories.Add(inventory);
        await dbContext.SaveChangesAsync();
    }

    public Task SaveChangesAsync() => dbContext.SaveChangesAsync();
}
