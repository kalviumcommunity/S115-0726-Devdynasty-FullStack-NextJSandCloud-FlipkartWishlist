const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  if (count > 0) {
    return;
  }

  await prisma.product.createMany({
    data: [
      {
        title: "Radiant LED Smart TV",
        description: "32-inch HD Smart LED TV with built-in streaming apps and Dolby audio.",
        price: 18999.0,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        stock: 50,
      },
      {
        title: "Noise-Cancelling Headphones",
        description: "Wireless over-ear headphones with active noise cancellation and long battery life.",
        price: 5999.0,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        category: "Audio",
        stock: 120,
      },
      {
        title: "Pro Performance Laptop",
        description: "15.6-inch laptop with Intel i5, 16GB RAM and 512GB SSD for everyday productivity.",
        price: 45999.0,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        stock: 30,
      },
      {
        title: "Everyday Backpack",
        description: "Durable backpack with padded laptop sleeve and multiple storage compartments.",
        price: 1299.0,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        category: "Fashion",
        stock: 200,
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
