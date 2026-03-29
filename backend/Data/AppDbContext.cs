using Glowvitra.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Glowvitra.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Inventory> Inventories => Set<Inventory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasMaxLength(20);

        modelBuilder.Entity<User>()
            .Property(u => u.IsActive)
            .HasDefaultValue(true);

        modelBuilder.Entity<Inventory>()
            .HasKey(i => i.ProductId);

        modelBuilder.Entity<Inventory>()
            .HasOne(i => i.Product)
            .WithOne(p => p.Inventory)
            .HasForeignKey<Inventory>(i => i.ProductId);

        modelBuilder.Entity<CartItem>()
            .HasOne(c => c.User)
            .WithMany(u => u.CartItems)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CartItem>()
            .HasOne(c => c.Product)
            .WithMany()
            .HasForeignKey(c => c.ProductId);

        modelBuilder.Entity<CartItem>()
            .HasCheckConstraint("CK_CartItems_Quantity", "Quantity > 0");

        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany(u => u.Orders)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.Items)
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Product)
            .WithMany()
            .HasForeignKey(oi => oi.ProductId);

        modelBuilder.Entity<OrderItem>()
            .HasCheckConstraint("CK_OrderItems_Quantity", "Quantity > 0");

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Transformation" },
            new Category { Id = 2, Name = "Setup" },
            new Category { Id = 3, Name = "Cozy" }
        );

        var passwordHasher = new PasswordHasher<User>();
        var adminUser = new User
        {
            Id = 1,
            Name = "Admin",
            Email = "admin@glowvitra.com",
            Role = "Admin",
            IsActive = true
        };
        adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, "Admin@123");

        var customerUser = new User
        {
            Id = 2,
            Name = "User",
            Email = "user@glowvitra.com",
            Role = "Customer",
            IsActive = true
        };
        customerUser.PasswordHash = passwordHasher.HashPassword(customerUser, "User@123");

        modelBuilder.Entity<User>().HasData(adminUser, customerUser);

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Astronaut Galaxy Projector",
                Description = "Immersive galaxy visuals for transformation spaces.",
                Price = 59.99m,
                CategoryId = 1,
                ImageUrl = "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=900&q=80"
            },
            new Product
            {
                Id = 2,
                Name = "Ocean Wave Projector",
                Description = "Relaxing wave patterns ideal for cozy bedrooms.",
                Price = 49.99m,
                CategoryId = 3,
                ImageUrl = "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=80"
            },
            new Product
            {
                Id = 3,
                Name = "Floor Corner RGB Lamp",
                Description = "Vertical RGB corner lamp for modern setups.",
                Price = 89.99m,
                CategoryId = 2,
                ImageUrl = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80"
            }
        );

        modelBuilder.Entity<Inventory>().HasData(
            new Inventory { ProductId = 1, StockQuantity = 25 },
            new Inventory { ProductId = 2, StockQuantity = 40 },
            new Inventory { ProductId = 3, StockQuantity = 15 }
        );
    }
}
