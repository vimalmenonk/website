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

## Fixes Applied

### UI alignment changes

- Updated the shared dark theme to match the reference aesthetic (`#0B0B0F`) with neon gradients, glass panels, and glow button styles.
- Refined existing pages only (no route restructuring): Navbar, Home, Product Listing, Product Details, Cart, Checkout, Admin Dashboard, Login/Admin Login, Product form, and Inventory table.
- Aligned forms, card spacing, table styling, and action buttons to the uploaded design style while keeping existing components/routes.

### Login issue fix explanation

- Added backend auth diagnostics (controller + service logging) to trace login attempts and outcomes.
- Normalized email lookup in `UserRepository` (`trim` + case-insensitive compare), which fixes failed logins due to casing/whitespace mismatches.
- Kept compatibility for seeded plaintext passwords while still verifying hashed passwords correctly.
- Confirmed JWT response contract includes `token`, `name`, `email`, and `role`, then reinforced frontend token persistence in `localStorage`.
- Added frontend debug logs for login API requests/responses and auth state updates to ensure token flow is observable.
- Fixed post-login redirects by role:
  - Admin → `/admin/dashboard`
  - User/Customer → `/`

### Steps to test login

1. Start backend and frontend.
2. Open `http://localhost:5173/auth` for user login or `http://localhost:5173/admin` for admin login.
3. Use the test credentials below.
4. Verify browser `localStorage` contains:
   - `glowvitra_token`
   - `glowvitra_user`
5. Verify redirect behavior:
   - Admin redirects to `/admin/dashboard`
   - User redirects to `/`

Test credentials:

Admin:  
admin@glowvitra.com / Admin@123

User:  
user@glowvitra.com / User@123
