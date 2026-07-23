import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const { quantity } = await request.json();

    if (quantity < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1." }, { status: 400 });
    }

    const existingCartItem = await prisma.cart.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!existingCartItem) {
      return NextResponse.json({ error: "Cart item not found." }, { status: 404 });
    }

    if (quantity > existingCartItem.product.stock) {
      return NextResponse.json({ error: "Quantity exceeds available stock." }, { status: 400 });
    }

    const cart = await prisma.cart.update({
      where: { id },
      data: {
        quantity,
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update cart." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);

    await prisma.cart.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Item removed from cart.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to remove item." }, { status: 500 });
  }
}
