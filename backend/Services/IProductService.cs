using Glowvitra.Api.DTOs;

namespace Glowvitra.Api.Services;

public interface IProductService
{
    Task<List<ProductResponse>> GetAllAsync();
    Task<ProductResponse?> GetByIdAsync(int id);
    Task<ProductResponse> CreateAsync(ProductRequest request);
    Task<bool> UpdateAsync(int id, ProductRequest request);
    Task<bool> DeleteAsync(int id);
}
