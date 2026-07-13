import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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
