import jwt from "jsonwebtoken";

const JWT_SIGNING_SECRET =
  process.env.JWT_SIGNING_SECRET || "DEFAULT_SIGNING_SECRET";

const JWT_ISSUER = "node-jwt";
const JWT_AUDIENCE = "node-jwt:api";

export function createToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username },
    JWT_SIGNING_SECRET,
    { expiresIn: "30 minutes", issuer: JWT_ISSUER, audience: JWT_AUDIENCE }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SIGNING_SECRET, {
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
  });
}

export function getUserIdFromToken(rawAuthValue) {
  const token = rawAuthValue.substring("Bearer ".length);
  const verifiedToken = verifyToken(token);

  return verifiedToken.sub;
}

export function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).send("Requires token");
    return;
  }

  try {
    getUserIdFromToken(req.headers.authorization);
  } catch (e) {
    res.status(403).send("Invalid token");
    return;
  }

  next();
}
