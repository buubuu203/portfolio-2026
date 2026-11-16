import { createHmac, randomUUID, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createAdminSessionToken() {
  const payload = `${randomUUID()}:${Date.now()}`;
  return `${payload}:${sign(payload)}`;
}

export function isValidAdminSessionToken(token: string | undefined) {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length < 3) return false;
  const sig = parts.pop()!;
  const payload = parts.join(":");
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  const timestamp = parseInt(parts[parts.length - 1], 10);
  if (isNaN(timestamp) || Date.now() - timestamp > SESSION_MAX_AGE_MS) return false;
  return true;
}

export async function requireAdminSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidAdminSessionToken(token)) {
    throw new Error("Not authenticated");
  }
}

export function isCorrectAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
