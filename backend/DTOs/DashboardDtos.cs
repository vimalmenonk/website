namespace Glowvitra.Api.DTOs;

public record DashboardSummaryResponse(int TotalProducts, int TotalOrders, decimal TotalRevenue, int TotalUsers);
