import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateProductUpdate } from "@/lib/productValidation.mjs";

export async function GET(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch product." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }

    const payload = await request.json();
    const validation = validateProductUpdate(payload);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        price: validation.value.price,
        stock: validation.value.stock,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update product." }, { status: 500 });
  }
}
