import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

function getToken(requestOrToken) {
  if (typeof requestOrToken === "string") return requestOrToken;

  const authHeader = requestOrToken?.headers?.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  const cookieToken = requestOrToken?.cookies?.get("auth_token")?.value;
  if (cookieToken) return cookieToken;

  return null;
}

export async function verifyToken(requestOrToken) {
  const token = getToken(requestOrToken);
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload;
  } catch {
    return null;
  }
}

export async function generateToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured.");

  const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role || "USER" })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(secret));
    
  return token;
}

export function isAdmin(user) {
  return user?.role === "ADMIN";
}

export async function getCurrentUser(request) {
  const payload = request ? await verifyToken(request) : await verifyToken((await cookies()).get("auth_token")?.value);
  return payload?.userId ? payload : null;
}

export async function verifyAdmin(request) {
  const user = await getCurrentUser(request);
  console.log("verifyAdmin -> user:", user);
  if (!user) return { user: null, reason: "unauthorized" };
  console.log("verifyAdmin -> isAdmin(user):", isAdmin(user));
  if (!isAdmin(user)) return { user: null, reason: "forbidden" };
  return { user };
}

export async function verifyAuth(request) {
  return await verifyToken(request);
}
