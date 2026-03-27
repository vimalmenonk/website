namespace Glowvitra.Api.DTOs;

public record AddCartItemRequest(int ProductId, int Quantity);
public record RemoveCartItemRequest(int ProductId);
public record CartItemResponse(int Id, int ProductId, string ProductName, decimal Price, int Quantity);
