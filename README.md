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



### Frontend

- Next.js

- React

- Tailwind CSS

- Axios

- React Toastify



### Backend

- Node.js

- Express.js



### Database

- Neon PostgreSQL



### ORM

- Prisma



### Authentication

- JWT

- bcrypt



### Deployment

- Vercel (Frontend)

- Render (Backend)

- Neon PostgreSQL (Database)



---



# ✨ Features



### 🔐 Authentication

- User Signup

- User Login

- JWT Authentication

- Protected Routes



### 📦 Products

- Browse Products

- Product Details

- Search Products

- Category Filters



### ❤️ Wishlist

- Add to Wishlist

- Remove from Wishlist

- Auto Stock Check (Every 30 Seconds)

- Live Stock Status Updates



### 🛒 Cart

- Add to Cart

- Remove from Cart

- Update Quantity

- Price Summary

- Checkout



### ⚡ Optimistic UI

- Instantly remove item from Wishlist

- Restore Wishlist if backend validation fails

- Smooth user experience



### ✅ Backend Validation

- Prevent adding out-of-stock products

- Secure stock verification



### 🎨 UI/UX

- Responsive Design

- Modern Flipkart-inspired Interface

- Toast Notifications

- Loading Skeletons

- Error Pages



---



# 📂 Project Structure



```text

Flipkart-Smart-Wishlist

│

├── client/                 # Next.js Frontend

│   ├── src/

│   ├── public/

│   └── package.json

│

├── server/                 # Express Backend

│   ├── prisma/

│   ├── controllers/

│   ├── routes/

│   ├── middleware/

│   └── package.json

│

└── README.md

```



---



# ⚙️ Installation



## Clone Repository



```bash

git clone <repository-url>

cd Flipkart-Smart-Wishlist

```



---



## Frontend



```bash

cd client

npm install

npm run dev

```



Runs on:



```

http://localhost:3000

```



---



## Backend



```bash

cd server

npm install

npm run dev

```



Runs on:



```

http://localhost:5000

```



---



# 🔑 Environment Variables



### Server (`server/.env`)



```env

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key

PORT=5000

```



### Client (`client/.env.local`)



```env

NEXT_PUBLIC_API_URL=http://localhost:5000/api

```



---



# 🌐 Application Flow



```text

Landing Page

      │

Login / Signup

      │

Authentication

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

      Backend Stock Validation

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



# 📅 Team Responsibilities



### 👨‍💻 Pratite Acharya

- Authentication

- Product APIs

- Home Page

- Product Details



### 👨‍💻 Sasmit Narnaware

- Wishlist

- Stock Monitoring

- Auto Stock Polling

- Wishlist APIs



### 👨‍💻 Atharva Hargude

- Cart Module

- Checkout

- Optimistic Move-to-Cart

- Cart APIs

- GitHub Actions

- Deployment



---



# 📈 Project Status



🚧 **Currently in Development**



---



## ⭐ If you like this project, don't forget to star the repository!