const prisma = require("../prismaClient");

// Get all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user ? (req.user.userId || req.user.id) : Number(req.query.userId);

    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user id." });
    }

    const cart = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch cart." });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const user_id = req.user ? (req.user.userId || req.user.id) : Number(userId);

    if (Number.isNaN(user_id)) {
      return res.status(400).json({ error: "Invalid user id." });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (product.stock === 0) {
      return res.status(400).json({ error: "Out of Stock." });
    }

    const reqQty = Number(quantity) || 1;
    if (reqQty < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1." });
    }

    const existingItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: Number(user_id),
          productId: Number(productId),
        },
      },
    });

    const totalRequested = (existingItem ? existingItem.quantity : 0) + reqQty;
    if (totalRequested > product.stock) {
      return res.status(400).json({ error: `Only ${product.stock} items available in stock.` });
    }

    if (existingItem) {
      const updated = await prisma.cart.update({
        where: { id: existingItem.id },
        data: {
          quantity: totalRequested,
        },
      });

      return res.json(updated);
    }

    const cart = await prisma.cart.create({
      data: {
        userId: Number(user_id),
        productId: Number(productId),
        quantity: reqQty,
      },
    });

    return res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to add item to cart." });
  }
};

// Update quantity
exports.updateCart = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { quantity } = req.body;

    const cartItem = await prisma.cart.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    const user_id = req.user ? (req.user.userId || req.user.id) : null;
    if (user_id && cartItem.userId !== user_id) {
      return res.status(403).json({ error: "Forbidden: You do not own this cart item." });
    }

    const reqQty = Number(quantity);
    if (Number.isNaN(reqQty) || reqQty < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1." });
    }

    const product = cartItem.product || await prisma.product.findUnique({
      where: { id: cartItem.productId },
    });

    if (product && reqQty > product.stock) {
      return res.status(400).json({ error: `Only ${product.stock} items available in stock.` });
    }

    const updated = await prisma.cart.update({
      where: { id },
      data: {
        quantity: reqQty,
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to update cart." });
  }
};

// Remove item
exports.removeCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const cartItem = await prisma.cart.findUnique({
      where: { id },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    const user_id = req.user ? (req.user.userId || req.user.id) : null;
    if (user_id && cartItem.userId !== user_id) {
      return res.status(403).json({ error: "Forbidden: You do not own this cart item." });
    }

    await prisma.cart.delete({
      where: { id },
    });

    return res.json({
      message: "Item removed from cart.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to remove item." });
  }
};
