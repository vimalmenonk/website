namespace Glowvitra.Api.DTOs;

public record OrderItemResponse(int ProductId, string ProductName, int Quantity, decimal Price);
public record OrderResponse(int Id, decimal TotalAmount, DateTime CreatedAt, List<OrderItemResponse> Items);
