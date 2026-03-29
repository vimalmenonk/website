using Glowvitra.Api.DTOs;
using Glowvitra.Api.Models;
using Glowvitra.Api.Repositories;

namespace Glowvitra.Api.Services;

public class InventoryService(IInventoryRepository inventoryRepository, IProductRepository productRepository) : IInventoryService
{
    public async Task<List<InventoryResponse>> GetAllAsync() =>
        (await inventoryRepository.GetAllAsync())
        .Select(i => new InventoryResponse(i.ProductId, i.Product?.Name ?? string.Empty, i.Product?.Price ?? 0, i.StockQuantity))
        .ToList();

    public async Task<bool> UpdateAsync(InventoryUpdateRequest request)
    {
        var product = await productRepository.GetByIdAsync(request.ProductId);
        if (product is null)
        {
            return false;
        }

        var inventory = await inventoryRepository.GetByProductIdAsync(request.ProductId);
        if (inventory is null)
        {
            await inventoryRepository.AddAsync(new Inventory
            {
                ProductId = request.ProductId,
                StockQuantity = request.StockQuantity
            });
            return true;
        }

        inventory.StockQuantity = request.StockQuantity;
        await inventoryRepository.SaveChangesAsync();
        return true;
    }
}
