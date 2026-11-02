/**
 * Client authentication storage and token helper.
 * Supports token-based auth (Authorization: Bearer <token>)
 * as well as cookie-based sessions (credentials: include).
 */

const TOKEN_KEY = "ai_todo_auth_token";
const USER_KEY = "ai_todo_user_cache";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      // Also set a document cookie so SSR / middleware can detect auth state
      document.cookie = `auth_token=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
    }
  } catch (err) {
    console.warn("Storage access failed", err);
  }
}

export function removeStoredToken() {
  setStoredToken(null);
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
  }
}

export function getCachedUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedUser(user) {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  } catch {}
}
