# 🛒 Kalakal — Frontend

The frontend for Kalakal, a full-stack e-commerce application. Built with Next.js 16 and Tailwind CSS, consuming the Kalakal REST API.

## 🔗 Live

**Frontend:** https://kalakal-core.vercel.app

**Backend API:** https://ecommerce-api-a9nh.onrender.com

**API Docs:** https://ecommerce-api-a9nh.onrender.com/api/docs/

## ✨ Features

- Browse products publicly — no login required
- Product detail page with stock status
- JWT authentication — register, login, logout
- Cart management — add, update quantity, remove items
- Atomic checkout — stock validation and order creation
- Order history and order detail pages
- Auth-aware navbar — shows different links based on login state

## 📄 Pages

| Page | URL | Auth |
|------|-----|------|
| Product List | `/` | Public |
| Product Detail | `/products/[id]` | Public |
| Register | `/register` | Public |
| Login | `/login` | Public |
| Cart | `/cart` | Required |
| Orders | `/orders` | Required |
| Order Detail | `/orders/[id]` | Required |

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with SSR |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vercel | Deployment |

## ⚙️ Setup (Local)

```bash
git clone https://github.com/Jkris0917/ecommerce-frontend
cd ecommerce-frontend
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Open `http://localhost:3000`

> Make sure the backend is running locally on port 8000, or point `NEXT_PUBLIC_API_URL` to the live API.

## 🔗 Related

- **Backend API:** [Kalakal API](https://github.com/Jkris0917/ecommerce-api)
- **Monorepo:** [Kalakal Fullstack](https://github.com/Jkris0917/ecommerce-fullstack)
