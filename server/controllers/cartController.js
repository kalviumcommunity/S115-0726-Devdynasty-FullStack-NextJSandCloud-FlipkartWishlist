const prisma = require("../prismaClient");

// Get all cart items for a user
exports.getCart = async (req, res) => {
  try {
    const userId = Number(req.query.userId);

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

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (product.stock === 0) {
      return res.status(400).json({ error: "Out of Stock." });
    }

    const existingItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: Number(userId),
          productId: Number(productId),
        },
      },
    });

    if (existingItem) {
      const updated = await prisma.cart.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + (quantity || 1),
        },
      });

      return res.json(updated);
    }

    const cart = await prisma.cart.create({
      data: {
        userId: Number(userId),
        productId: Number(productId),
        quantity: quantity || 1,
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

    const cart = await prisma.cart.update({
      where: { id },
      data: {
        quantity,
      },
    });

    return res.json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to update cart." });
  }
};

// Remove item
exports.removeCartItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

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
