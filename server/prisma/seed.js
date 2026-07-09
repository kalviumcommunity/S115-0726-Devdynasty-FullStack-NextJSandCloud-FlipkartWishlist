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
        name: "Radiant LED Smart TV",
        description: "32-inch HD Smart LED TV with built-in streaming apps and Dolby audio.",
        price: 18999.0,
        imageUrl: "https://via.placeholder.com/400x300?text=Smart+TV",
      },
      {
        name: "Noise-Cancelling Headphones",
        description: "Wireless over-ear headphones with active noise cancellation and long battery life.",
        price: 5999.0,
        imageUrl: "https://via.placeholder.com/400x300?text=Headphones",
      },
      {
        name: "Pro Performance Laptop",
        description: "15.6-inch laptop with Intel i5, 16GB RAM and 512GB SSD for everyday productivity.",
        price: 45999.0,
        imageUrl: "https://via.placeholder.com/400x300?text=Laptop",
      },
      {
        name: "Everyday Backpack",
        description: "Durable backpack with padded laptop sleeve and multiple storage compartments.",
        price: 1299.0,
        imageUrl: "https://via.placeholder.com/400x300?text=Backpack",
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
