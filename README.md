# 🛒 Flipkart Smart Wishlist

A full-stack Flipkart-inspired e-commerce application that automatically monitors wishlist product stock, provides a seamless shopping experience through optimistic UI updates, and prevents users from adding out-of-stock items to their cart.

---

## 📌 Problem Statement

Flipkart wants a wishlist that automatically checks stock availability every **30 seconds** for wishlisted items only. When a user moves an item to the cart, the UI should update immediately (Optimistic UI), while the backend validates stock availability and prevents out-of-stock products from being added.

---

## 👥 Team Members

| Name | Responsibility |
|------|----------------|
| **Pratite Acharya** | Authentication, Products & Home |
| **Sasmit Narnaware** | Wishlist & Auto Stock Monitoring |
| **Atharva Hargude** | Cart, Checkout, Optimistic UI, Deployment |

---

# 🚀 Tech Stack

### Full-Stack Framework
- **Next.js 15+ (App Router)** (Unified Frontend & Serverless Backend)
- **React**

### Styling & UI
- **Vanilla CSS / CSS Modules** (with modern CSS variables & animations)
- **React Toastify** (Notifications)

### Database & ORM
- **PostgreSQL (Neon)**
- **Prisma ORM**

### Authentication & Security
- **Custom JWT Auth** (Using `jose` for Next.js Edge Runtime compatibility)
- **bcrypt** (Password Hashing)
- **Next.js Middleware** (Protected Routes)

### Deployment
- **Vercel** (Unified Frontend & API Routes)
- **Neon** (Serverless PostgreSQL)

---

# ✨ Features

### 🔐 Authentication
- User Signup
- User Login
- JWT Authentication (Edge-compatible)
- Protected Routes & Admin Roles

### 📦 Products & Admin Dashboard
- Browse Products & Details
- Search Products & Category Filters
- Admin UI for real-time inventory and pricing management

### ❤️ Wishlist
- Add to / Remove from Wishlist
- Auto Stock Check (Every 30 Seconds via Polling)
- Live Stock Status Updates & Alerts

### 🛒 Cart
- Add to / Remove from Cart
- Update Quantity & Price Summary
- Checkout Flow

### ⚡ Optimistic UI
- Instantly remove item from Wishlist visually
- Restore Wishlist if backend validation fails
- Smooth user experience with background state sync

### ✅ Backend Validation
- Prevent adding out-of-stock products via Serverless API Routes
- Secure stock verification directly against PostgreSQL

---

# 📂 Project Structure

This project utilizes a modern **unified full-stack architecture** via Next.js App Router, meaning the frontend and backend are housed in the same directory.

```text
Flipkart-Smart-Wishlist
│
├── client/                     # Unified Full-Stack Next.js App
│   ├── prisma/                 # Database schema & migrations
│   ├── src/
│   │   ├── app/                # Next.js App Router (Frontend Pages)
│   │   │   └── api/            # Next.js Serverless API Routes (Backend)
│   │   ├── components/         # Reusable React components
│   │   ├── lib/                # Auth utilities, DB client, validators
│   │   ├── services/           # Frontend fetch wrappers
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   └── package.json            # Dependencies & Scripts
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/kalviumcommunity/S115-0726-Devdynasty-FullStack-NextJSandCloud-FlipkartWishlist.git
cd Flipkart-Smart-Wishlist
```

---

## Setup & Run Locally

Since this is a unified Next.js application, you only need to install and run the `client` directory.

```bash
cd client
npm install
```

### 🔑 Environment Variables (`client/.env`)
Create a `.env` file inside the `client` directory:

```env
DATABASE_URL=your_neon_postgresql_url
JWT_SECRET=your_secure_secret_key
```

### 🚀 Start Development Server

```bash
# Push schema to the database if running for the first time
npx prisma db push

# Start the Next.js dev server
npm run dev
```

The unified app (Frontend + Backend APIs) will run on:
```
http://localhost:3000
```

---

# 🌐 Application Flow

```text
Landing Page
      │
Login / Signup
      │
Authentication (JWT Middleware)
      │
Home Page
      │
├──────────────┬──────────────┐
│              │              │
▼              ▼              ▼
Products   Wishlist         Cart
│              │              │
│      Auto Stock Check      │
│      Every 30 Seconds      │
│              │              │
└──── Move To Cart ───────────┘
               │
        Optimistic Update
               │
      Backend Stock Validation (Next.js API)
               │
      ┌────────┴────────┐
      ▼                 ▼
   Success           Failed
      │                 │
      ▼                 ▼
Cart Updated    Restore Wishlist
```

---

# 🌿 Git Branch Strategy

- `main` → Stable production branch
- `feature/*` → Feature development
- `bugfix/*` → Bug fixes
- `hotfix/*` → Critical fixes

---

# 👨‍💻 Development Workflow

1. Create a feature branch from `main`.
2. Implement the assigned feature.
3. Commit with meaningful messages.
4. Push the branch to GitHub.
5. Create a Pull Request.
6. Review and merge after approval.

---

# 📈 Project Status

🚧 **Currently in Development**

---

## ⭐ If you like this project, don't forget to star the repository!