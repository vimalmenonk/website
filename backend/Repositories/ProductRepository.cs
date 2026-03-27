using Glowvitra.Api.Data;
using Glowvitra.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Repositories;

public class ProductRepository(AppDbContext dbContext) : IProductRepository
{
    public Task<List<Product>> GetAllAsync() =>
        dbContext.Products.Include(p => p.Category).ToListAsync();

    public Task<Product?> GetByIdAsync(int id) =>
        dbContext.Products.Include(p => p.Category).Include(p => p.Inventory).FirstOrDefaultAsync(p => p.Id == id);

    public async Task<Product> AddAsync(Product product)
    {
        dbContext.Products.Add(product);
        await dbContext.SaveChangesAsync();
        return product;
    }

    public async Task UpdateAsync(Product product)
    {
        dbContext.Products.Update(product);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product product)
    {
        dbContext.Products.Remove(product);
        await dbContext.SaveChangesAsync();
    }
}
