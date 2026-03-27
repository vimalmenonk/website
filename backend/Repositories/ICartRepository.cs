using Glowvitra.Api.Models;

namespace Glowvitra.Api.Repositories;

public interface ICartRepository
{
    Task<List<CartItem>> GetByUserIdAsync(int userId);
    Task<CartItem?> GetByUserAndProductAsync(int userId, int productId);
    Task AddAsync(CartItem item);
    Task RemoveAsync(CartItem item);
    Task SaveChangesAsync();
}
