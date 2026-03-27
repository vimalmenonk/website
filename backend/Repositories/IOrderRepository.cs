using Glowvitra.Api.Models;

namespace Glowvitra.Api.Repositories;

public interface IOrderRepository
{
    Task<List<Order>> GetByUserIdAsync(int userId);
    Task<Order> AddAsync(Order order);
}
