import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const payload = verifyAuth(request);
    const userId = payload ? payload.userId : Number(request.nextUrl.searchParams.get("userId"));

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch cart." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = verifyAuth(request);
    const body = await request.json();
    const userId = payload ? payload.userId : Number(body.userId);
    const { productId, quantity } = body;

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    if (product.stock === 0) {
      return NextResponse.json({ error: "Out of Stock." }, { status: 400 });
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

      return NextResponse.json(updated);
    }

    const cart = await prisma.cart.create({
      data: {
        userId: Number(userId),
        productId: Number(productId),
        quantity: quantity || 1,
      },
    });

    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to add item to cart." }, { status: 500 });
  }
}
