const prisma = require("../prismaClient");

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId; // assuming the payload has userId, wait, let me check auth payload later. It usually is id or userId. I'll use req.user.id or req.user.userId.

    // Let's assume req.user.id is the standard from jwt.
    const user_id = req.user.id || req.user.userId;

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user_id },
      include: {
        product: true,
      },
    });

    res.json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const user_id = req.user.id || req.user.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const existingItem = await prisma.wishlist.findUnique({
      where: {
        userId_productId: {
          userId: user_id,
          productId: parseInt(productId),
        },
      },
    });

    if (existingItem) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    const newWishlistItem = await prisma.wishlist.create({
      data: {
        userId: user_id,
        productId: parseInt(productId),
      },
      include: {
        product: true,
      },
    });

    res.status(201).json(newWishlistItem);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const user_id = req.user.id || req.user.userId;
    const { id } = req.params; // wishlist id

    const wishlistItem = await prisma.wishlist.findUnique({
      where: { id: parseInt(id) },
    });

    if (!wishlistItem || wishlistItem.userId !== user_id) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    await prisma.wishlist.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

exports.checkStock = async (req, res) => {
  try {
    const user_id = req.user.id || req.user.userId;

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user_id },
      include: {
        product: {
          select: {
            id: true,
            stock: true,
          }
        },
      },
    });

    // Return just a map of productId to stock to be efficient
    const stockInfo = wishlist.reduce((acc, item) => {
      acc[item.productId] = item.product.stock;
      return acc;
    }, {});

    res.json(stockInfo);
  } catch (error) {
    console.error("Error checking stock:", error);
    res.status(500).json({ error: "Failed to check stock" });
  }
};
