const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or invalid." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
