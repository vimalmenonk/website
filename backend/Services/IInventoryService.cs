using Glowvitra.Api.DTOs;

namespace Glowvitra.Api.Services;

public interface IInventoryService
{
    Task<List<InventoryResponse>> GetAllAsync();
    Task<bool> UpdateAsync(InventoryUpdateRequest request);
}
