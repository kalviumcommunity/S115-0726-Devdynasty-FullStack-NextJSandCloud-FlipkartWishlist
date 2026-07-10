import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const payload = verifyAuth(request);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = payload.userId;
    const { id: paramId } = await params;
    const id = parseInt(paramId);

    const wishlistItem = await prisma.wishlist.findUnique({
      where: { id },
    });

    if (!wishlistItem || wishlistItem.userId !== userId) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 });
    }

    await prisma.wishlist.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
