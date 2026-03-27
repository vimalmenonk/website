IF DB_ID('GlowvitraDb') IS NULL
BEGIN
    CREATE DATABASE GlowvitraDb;
END;
GO

USE GlowvitraDb;
GO

IF OBJECT_ID('dbo.OrderItems', 'U') IS NOT NULL DROP TABLE dbo.OrderItems;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.CartItems', 'U') IS NOT NULL DROP TABLE dbo.CartItems;
IF OBJECT_ID('dbo.Inventory', 'U') IS NOT NULL DROP TABLE dbo.Inventory;
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL DROP TABLE dbo.Products;
IF OBJECT_ID('dbo.Categories', 'U') IS NOT NULL DROP TABLE dbo.Categories;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
GO

CREATE TABLE dbo.Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(120) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,
    Role NVARCHAR(20) NOT NULL CONSTRAINT CK_Users_Role CHECK (Role IN ('Admin', 'Customer'))
);
GO

CREATE TABLE dbo.Categories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(120) NOT NULL UNIQUE
);
GO

CREATE TABLE dbo.Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Price DECIMAL(18,2) NOT NULL CONSTRAINT CK_Products_Price CHECK (Price >= 0),
    CategoryId INT NOT NULL,
    ImageUrl NVARCHAR(1024) NOT NULL,
    CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id)
);
GO

CREATE TABLE dbo.Inventory (
    ProductId INT PRIMARY KEY,
    StockQuantity INT NOT NULL CONSTRAINT CK_Inventory_StockQuantity CHECK (StockQuantity >= 0),
    CONSTRAINT FK_Inventory_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id) ON DELETE CASCADE
);
GO

CREATE TABLE dbo.CartItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL CONSTRAINT CK_CartItems_Quantity CHECK (Quantity > 0),
    CONSTRAINT FK_CartItems_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
    CONSTRAINT FK_CartItems_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id),
    CONSTRAINT UQ_CartItems_User_Product UNIQUE (UserId, ProductId)
);
GO

CREATE TABLE dbo.Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL CONSTRAINT CK_Orders_TotalAmount CHECK (TotalAmount >= 0),
    CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Orders_CreatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Orders_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
);
GO

CREATE TABLE dbo.OrderItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL CONSTRAINT CK_OrderItems_Quantity CHECK (Quantity > 0),
    Price DECIMAL(18,2) NOT NULL CONSTRAINT CK_OrderItems_Price CHECK (Price >= 0),
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES dbo.Orders(Id) ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_Products FOREIGN KEY (ProductId) REFERENCES dbo.Products(Id)
);
GO

SET IDENTITY_INSERT dbo.Users ON;
INSERT INTO dbo.Users (Id, Name, Email, PasswordHash, Role)
VALUES
    (1, 'Admin', 'admin@glowvitra.com', 'Admin@123', 'Admin'),
    (2, 'User', 'user@glowvitra.com', 'User@123', 'Customer');
SET IDENTITY_INSERT dbo.Users OFF;
GO

INSERT INTO dbo.Categories (Name)
VALUES ('Transformation'), ('Setup'), ('Cozy');
GO

SET IDENTITY_INSERT dbo.Products ON;
INSERT INTO dbo.Products (Id, Name, Description, Price, CategoryId, ImageUrl)
VALUES
    (1, 'Astronaut Galaxy Projector', 'Immersive galaxy visuals for transformation spaces.', 59.99, 1, 'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=900&q=80'),
    (2, 'Ocean Wave Projector', 'Relaxing wave patterns ideal for cozy bedrooms.', 49.99, 3, 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=80'),
    (3, 'Floor Corner RGB Lamp', 'Vertical RGB corner lamp for modern setups.', 89.99, 2, 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80');
SET IDENTITY_INSERT dbo.Products OFF;
GO

INSERT INTO dbo.Inventory (ProductId, StockQuantity)
VALUES (1, 25), (2, 40), (3, 15);
GO
