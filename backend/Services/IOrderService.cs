using Glowvitra.Api.DTOs;

namespace Glowvitra.Api.Services;

public interface IOrderService
{
    Task<OrderResponse> CreateAsync(int userId);
    Task<List<OrderResponse>> GetOrdersAsync(int userId);
}
