using Glowvitra.Api.DTOs;
using Glowvitra.Api.Models;
using Glowvitra.Api.Repositories;

namespace Glowvitra.Api.Services;

public class OrderService(
    ICartRepository cartRepository,
    IOrderRepository orderRepository,
    IInventoryRepository inventoryRepository) : IOrderService
{
    public async Task<OrderResponse> CreateAsync(int userId)
    {
        var cartItems = await cartRepository.GetByUserIdAsync(userId);
        if (cartItems.Count == 0)
        {
            throw new InvalidOperationException("Cart is empty.");
        }

        var orderItems = new List<OrderItem>();
        decimal total = 0;

        foreach (var cartItem in cartItems)
        {
            var product = cartItem.Product ?? throw new InvalidOperationException("Product missing in cart.");
            var inventory = await inventoryRepository.GetByProductIdAsync(product.Id);
            if (inventory is null || inventory.StockQuantity < cartItem.Quantity)
            {
                throw new InvalidOperationException($"Insufficient stock for product {product.Name}.");
            }

            inventory.StockQuantity -= cartItem.Quantity;

            orderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                Quantity = cartItem.Quantity,
                Price = product.Price
            });

            total += product.Price * cartItem.Quantity;
        }

        var order = new Order
        {
            UserId = userId,
            TotalAmount = total,
            CreatedAt = DateTime.UtcNow,
            Items = orderItems
        };

        await orderRepository.AddAsync(order);

        foreach (var cart in cartItems)
        {
            await cartRepository.RemoveAsync(cart);
        }

        return Map(order);
    }

    public async Task<List<OrderResponse>> GetOrdersAsync(int userId) =>
        (await orderRepository.GetByUserIdAsync(userId)).Select(Map).ToList();

    private static OrderResponse Map(Order order) =>
        new(order.Id, order.TotalAmount, order.CreatedAt,
            order.Items.Select(i => new OrderItemResponse(i.ProductId, i.Product?.Name ?? string.Empty, i.Quantity, i.Price)).ToList());
}
