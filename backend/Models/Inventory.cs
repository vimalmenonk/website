namespace Glowvitra.Api.Models;

public class Inventory
{
    public int ProductId { get; set; }
    public int StockQuantity { get; set; }

    public Product? Product { get; set; }
}
