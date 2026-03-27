namespace Glowvitra.Api.DTOs;

public record ProductRequest(string Name, string Description, decimal Price, int CategoryId, string ImageUrl);
public record ProductResponse(int Id, string Name, string Description, decimal Price, int CategoryId, string CategoryName, string ImageUrl);
