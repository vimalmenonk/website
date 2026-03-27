using Glowvitra.Api.Models;

namespace Glowvitra.Api.Repositories;

public interface IInventoryRepository
{
    Task<List<Inventory>> GetAllAsync();
    Task<Inventory?> GetByProductIdAsync(int productId);
    Task AddAsync(Inventory inventory);
    Task SaveChangesAsync();
}
