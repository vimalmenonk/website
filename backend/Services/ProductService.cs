using Glowvitra.Api.DTOs;
using Glowvitra.Api.Models;
using Glowvitra.Api.Repositories;

namespace Glowvitra.Api.Services;

public class ProductService(IProductRepository productRepository) : IProductService
{
    public async Task<List<ProductResponse>> GetAllAsync() =>
        (await productRepository.GetAllAsync())
        .Select(ToResponse)
        .ToList();

    public async Task<ProductResponse?> GetByIdAsync(int id)
    {
        var product = await productRepository.GetByIdAsync(id);
        return product is null ? null : ToResponse(product);
    }

    public async Task<ProductResponse> CreateAsync(ProductRequest request)
    {
        var product = new Product
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            CategoryId = request.CategoryId,
            ImageUrl = request.ImageUrl
        };

        var created = await productRepository.AddAsync(product);
        var withIncludes = await productRepository.GetByIdAsync(created.Id) ?? created;
        return ToResponse(withIncludes);
    }

    public async Task<bool> UpdateAsync(int id, ProductRequest request)
    {
        var product = await productRepository.GetByIdAsync(id);
        if (product is null)
        {
            return false;
        }

        product.Name = request.Name;
        product.Description = request.Description;
        product.Price = request.Price;
        product.CategoryId = request.CategoryId;
        product.ImageUrl = request.ImageUrl;

        await productRepository.UpdateAsync(product);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await productRepository.GetByIdAsync(id);
        if (product is null)
        {
            return false;
        }

        await productRepository.DeleteAsync(product);
        return true;
    }

    private static ProductResponse ToResponse(Product p) =>
        new(p.Id, p.Name, p.Description, p.Price, p.CategoryId, p.Category?.Name ?? string.Empty, p.ImageUrl);
}
