# Glowvitra Full Stack

Glowvitra is a full-stack ecommerce app with a React frontend, ASP.NET Core backend, and SQL Server database.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router, Axios
- Backend: ASP.NET Core 8 Web API, Entity Framework Core, JWT Auth
- Database: Microsoft SQL Server

## Database Setup

- Run `database/database.sql` in SQL Server.
- Update backend connection string in `backend/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SQL_SERVER;Database=GlowvitraDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

## Backend Configuration

- DbContext is configured in `backend/Data/AppDbContext.cs`.
- SQL Server is configured in `backend/Program.cs` using `UseSqlServer`.
- Migrations are enabled through Entity Framework Core packages and applied on startup via `Database.Migrate()`.

## Run Full Project

1. Start backend

```bash
cd backend
dotnet restore
dotnet run
```

2. Start frontend

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend API: `http://localhost:5086/api`

## Credentials

Admin:  
admin@glowvitra.com / Admin@123

User:  
user@glowvitra.com / User@123

## Implemented API Connections

- Auth: Login + Signup connected to `/api/auth`
- Products: Listing + Details + Admin CRUD connected to `/api/products`
- Cart: Add/Remove/Get connected to `/api/cart`
- Orders: Create + Order History connected to `/api/orders`
- Inventory: Admin inventory tracking connected to `/api/inventory`
