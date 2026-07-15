import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "portfolio_session";
const SESSION_DURATION = "7d";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET n'est pas défini.");
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user) {
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export { SESSION_MAX_AGE };
