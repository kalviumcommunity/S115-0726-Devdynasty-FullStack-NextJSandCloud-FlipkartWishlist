import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const payload = verifyAuth(request);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch user." }, { status: 500 });
  }
}
