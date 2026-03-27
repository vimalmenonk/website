# Glowvitra Frontend

Glowvitra is a complete React + Vite ecommerce frontend focused on immersive ambience products. The UI is designed with a dark neon style and includes both customer and admin-facing pages ready for API integration.

## Tech Stack

- React (Vite)
- Tailwind CSS
- React Router
- Axios

## Run Locally

```bash
npm install
npm run dev
```

## Folder Structure

```text
src/
├── components/
├── context/
├── pages/
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

## Included Pages

- Homepage
- Product Listing Page
- Product Details Page
- Cart Page
- Checkout Page
- Login / Signup Page
- User Account Page
- Admin Login Page
- Admin Dashboard
- Product Management Page
- Add/Edit Product Page
- Inventory Management Page

## Notes

- Mock authentication and cart state are implemented with Context API.
- API structure is pre-configured at `http://localhost:5000/api`.
- No backend or database is included.

## Backend Setup

```bash
cd backend
dotnet restore
dotnet run
```

API base URL: `http://localhost:5086/api`
