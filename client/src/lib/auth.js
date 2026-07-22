import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

function getToken(requestOrToken) {
  if (typeof requestOrToken === "string") return requestOrToken;

  const cookieToken = requestOrToken?.cookies?.get("auth_token")?.value;
  if (cookieToken) return cookieToken;

  const authHeader = requestOrToken?.headers?.get("authorization");
  return authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
}

export function verifyToken(requestOrToken) {
  const token = getToken(requestOrToken);
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;

  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function generateToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured.");

  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role || "USER" },
    secret,
    { expiresIn: "1d" },
  );
}

export function isAdmin(user) {
  return user?.role === "ADMIN";
}

export async function getCurrentUser(request) {
  const payload = request ? verifyToken(request) : verifyToken((await cookies()).get("auth_token")?.value);
  return payload?.userId ? payload : null;
}

export async function verifyAdmin(request) {
  const user = await getCurrentUser(request);
  if (!user) return { user: null, reason: "unauthorized" };
  if (!isAdmin(user)) return { user: null, reason: "forbidden" };
  return { user };
}

export function verifyAuth(request) {
  return verifyToken(request);
}
