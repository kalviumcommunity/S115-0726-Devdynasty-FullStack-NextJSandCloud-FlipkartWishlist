import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const { quantity } = await request.json();

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
