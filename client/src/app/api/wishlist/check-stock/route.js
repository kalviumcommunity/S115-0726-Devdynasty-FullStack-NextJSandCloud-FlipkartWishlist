import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const payload = verifyAuth(request);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = payload.userId;

    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            stock: true,
          }
        },
      },
    });

    const stockInfo = wishlist.reduce((acc, item) => {
      acc[item.productId] = item.product.stock;
      return acc;
    }, {});

    return NextResponse.json(stockInfo);
  } catch (error) {
    console.error("Error checking stock:", error);
    return NextResponse.json({ error: "Failed to check stock" }, { status: 500 });
  }
}
