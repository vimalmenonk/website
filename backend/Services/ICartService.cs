using Glowvitra.Api.DTOs;

namespace Glowvitra.Api.Services;

public interface ICartService
{
    Task<List<CartItemResponse>> GetCartAsync(int userId);
    Task AddAsync(int userId, AddCartItemRequest request);
    Task<bool> RemoveAsync(int userId, int productId);
}
