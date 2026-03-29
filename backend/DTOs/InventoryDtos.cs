namespace Glowvitra.Api.DTOs;

public record InventoryUpdateRequest(int ProductId, int StockQuantity);
public record InventoryResponse(int ProductId, string ProductName, decimal Price, int StockQuantity);
