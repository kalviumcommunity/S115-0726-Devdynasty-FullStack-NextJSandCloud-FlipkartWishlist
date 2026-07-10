import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

function createToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return jwt.sign(
    { userId: user.id, email: user.email }, 
    secret,
    { expiresIn: "1d" }
  );
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = createToken(user);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to login." }, { status: 500 });
  }
}
