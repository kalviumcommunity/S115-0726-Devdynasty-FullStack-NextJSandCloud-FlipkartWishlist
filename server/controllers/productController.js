const prisma = require("../prismaClient");

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch products." });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid product id." });
    }

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch product." });
  }
};
