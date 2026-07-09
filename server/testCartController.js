const Module = require('module');
const originalRequire = Module.prototype.require;

// Define mock database state
const mockDb = {
  products: [
    { id: 1, title: "Radiant LED Smart TV", price: 18999.0, stock: 5 },
    { id: 2, title: "Noise-Cancelling Headphones", price: 5999.0, stock: 0 }, // Out of stock
  ],
  cart: [
    { id: 10, userId: 1, productId: 1, quantity: 2 },
  ]
};

const mockPrisma = {
  product: {
    findUnique: async ({ where }) => {
      return mockDb.products.find(p => p.id === where.id) || null;
    }
  },
  cart: {
    findMany: async ({ where }) => {
      const items = mockDb.cart.filter(c => c.userId === where.userId);
      return items.map(item => ({
        ...item,
        product: mockDb.products.find(p => p.id === item.productId)
      }));
    },
    findUnique: async ({ where }) => {
      if (where.userId_productId) {
        const { userId, productId } = where.userId_productId;
        return mockDb.cart.find(c => c.userId === userId && c.productId === productId) || null;
      }
      return mockDb.cart.find(c => c.id === where.id) || null;
    },
    create: async ({ data }) => {
      const newItem = {
        id: mockDb.cart.length + 1,
        ...data
      };
      mockDb.cart.push(newItem);
      return newItem;
    },
    update: async ({ where, data }) => {
      const item = mockDb.cart.find(c => c.id === where.id);
      if (!item) throw new Error("Record to update not found.");
      if (data.quantity !== undefined) {
        item.quantity = data.quantity;
      }
      return item;
    },
    delete: async ({ where }) => {
      const index = mockDb.cart.findIndex(c => c.id === where.id);
      if (index === -1) throw new Error("Record to delete not found.");
      mockDb.cart.splice(index, 1);
      return { id: where.id };
    }
  }
};

// Override require to intercept prismaClient and substitute mockPrisma
Module.prototype.require = function(path) {
  if (path.endsWith('prismaClient')) {
    return mockPrisma;
  }
  return originalRequire.apply(this, arguments);
};

// Now import the controller
const cartController = require('./controllers/cartController');

// Define helper to create mock request response objects
function createMockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    }
  };
}

async function runTests() {
  console.log("=== STARTING CART CONTROLLER TESTS ===\n");

  // Test 1: Get Cart (Success)
  {
    console.log("Test 1: Get Cart for User 1 (GET /api/cart?userId=1)");
    const req = { query: { userId: "1" } };
    const res = createMockRes();
    await cartController.getCart(req, res);
    console.log("Response status:", res.statusCode);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    console.log("------------------------------------------");
  }

  // Test 2: Add Item (Success - New item)
  {
    console.log("Test 2: Add Product 1 to Cart for User 2 (POST /api/cart, body: {userId: 2, productId: 1, quantity: 1})");
    const req = { body: { userId: 2, productId: 1, quantity: 1 } };
    const res = createMockRes();
    await cartController.addToCart(req, res);
    console.log("Response status:", res.statusCode);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    console.log("------------------------------------------");
  }

  // Test 3: Add Item (Success - Existing item update quantity)
  {
    console.log("Test 3: Add Product 1 to Cart for User 2 again (POST /api/cart, body: {userId: 2, productId: 1, quantity: 2})");
    const req = { body: { userId: 2, productId: 1, quantity: 2 } };
    const res = createMockRes();
    await cartController.addToCart(req, res);
    console.log("Response status:", res.statusCode);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    console.log("------------------------------------------");
  }

  // Test 4: Add Item (Failure - Out of stock)
  {
    console.log("Test 4: Add Product 2 to Cart for User 1 (POST /api/cart, body: {userId: 1, productId: 2, quantity: 1}) -> Product 2 is out of stock");
    const req = { body: { userId: 1, productId: 2, quantity: 1 } };
    const res = createMockRes();
    await cartController.addToCart(req, res);
    console.log("Response status:", res.statusCode);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    console.log("------------------------------------------");
  }

  // Test 5: Update Quantity (PATCH /api/cart/10)
  {
    console.log("Test 5: Update Quantity of Cart Item 10 to 4 (PATCH /api/cart/10, body: {quantity: 4})");
    const req = { params: { id: "10" }, body: { quantity: 4 } };
    const res = createMockRes();
    await cartController.updateCart(req, res);
    console.log("Response status:", res.statusCode);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    console.log("------------------------------------------");
  }

  // Test 6: Remove Item (DELETE /api/cart/10)
  {
    console.log("Test 6: Remove Cart Item 10 (DELETE /api/cart/10)");
    const req = { params: { id: "10" } };
    const res = createMockRes();
    await cartController.removeCartItem(req, res);
    console.log("Response status:", res.statusCode);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    console.log("------------------------------------------");
  }

  console.log("=== ALL TESTS COMPLETED ===");
}

runTests().catch(console.error);
