using Glowvitra.Api.DTOs;
using Glowvitra.Api.Models;
using Glowvitra.Api.Repositories;

namespace Glowvitra.Api.Services;

public class CartService(ICartRepository cartRepository, IProductRepository productRepository) : ICartService
{
    public async Task<List<CartItemResponse>> GetCartAsync(int userId) =>
        (await cartRepository.GetByUserIdAsync(userId))
        .Select(c => new CartItemResponse(c.Id, c.ProductId, c.Product?.Name ?? string.Empty, c.Product?.Price ?? 0, c.Quantity))
        .ToList();

    public async Task AddAsync(int userId, AddCartItemRequest request)
    {
        var product = await productRepository.GetByIdAsync(request.ProductId)
            ?? throw new KeyNotFoundException("Product not found.");

        var existing = await cartRepository.GetByUserAndProductAsync(userId, request.ProductId);
        if (existing is null)
        {
            await cartRepository.AddAsync(new CartItem
            {
                UserId = userId,
                ProductId = product.Id,
                Quantity = request.Quantity
            });
            return;
        }

        existing.Quantity += request.Quantity;
        await cartRepository.SaveChangesAsync();
    }

    public async Task<bool> RemoveAsync(int userId, int productId)
    {
        var existing = await cartRepository.GetByUserAndProductAsync(userId, productId);
        if (existing is null)
        {
            return false;
        }

        await cartRepository.RemoveAsync(existing);
        return true;
    }
}
