using Microsoft.AspNetCore.Http;

namespace Glowvitra.Api.DTOs;

public record ProductRequest(string Name, string Description, decimal Price, int CategoryId, string ImageUrl);

public class ProductCreateRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public int StockQuantity { get; set; }
    public IFormFile? ImageFile { get; set; }
    public string? ImageUrl { get; set; }
}

public record ProductResponse(int Id, string Name, string Description, decimal Price, int CategoryId, string CategoryName, string ImageUrl);
