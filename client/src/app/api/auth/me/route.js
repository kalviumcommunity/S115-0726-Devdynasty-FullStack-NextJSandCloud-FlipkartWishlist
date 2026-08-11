import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const payload = await verifyAuth(request);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, role: true, address: true, createdAt: true },
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

export async function PUT(request) {
  try {
    const payload = await verifyAuth(request);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, address } = body;

    const dataToUpdate = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (address !== undefined) dataToUpdate.address = address;

    if (email !== undefined) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
      }

      // Check for duplicate email if it's changing
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== payload.userId) {
        return NextResponse.json({ error: "Email is already in use by another account." }, { status: 409 });
      }
      dataToUpdate.email = email;
    }

    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: dataToUpdate,
      select: { id: true, name: true, email: true, role: true, address: true, createdAt: true },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Unable to update profile." }, { status: 500 });
  }
}
