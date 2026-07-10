import jwt from "jsonwebtoken";

export function verifyAuth(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
    }
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
