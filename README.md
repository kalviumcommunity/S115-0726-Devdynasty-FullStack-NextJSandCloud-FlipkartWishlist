# Flipkart Smart Wishlist

## Problem Statement

Flipkart wants a wishlist that automatically checks stock every 30 seconds for wishlisted items only. Moving an item to the cart removes it from the wishlist optimistically, while the backend prevents adding out-of-stock items.

## Team Members

- Pratite Acharya
- Sasmit Narnaware
- Atharva Hargude

## Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB

## Features

- Authentication
- Product Listing
- Wishlist
- Auto Stock Check
- Optimistic Cart
- Cart Validation

## Folder Structure

```text
client/         # React frontend
server/         # Express backend
```

## Installation Steps

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

## Git Branch Strategy

- main: production-ready code
- feature/*: new features and enhancements
- bugfix/*: bug fixes
- hotfix/*: urgent production fixes

## Project Workflow

1. Create a feature branch from main.
2. Implement the required changes.
3. Commit with a clear message.
4. Push the branch to the remote repository.
5. Open a pull request for review.
