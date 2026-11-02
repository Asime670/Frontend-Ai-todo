import { apiFetch } from "@/lib/api";
import { setStoredToken, removeStoredToken, setCachedUser } from "@/lib/auth";

export const authService = {
  /**
   * Register a new user { username, email, password }
   * Endpoint: POST http://localhost:3001/auth/register
   */
  async register(data) {
    const payload = typeof data === "string" ? JSON.parse(data) : data;
    const body = {
      username: payload.username || payload.name?.replace(/\s+/g, "").toLowerCase() || payload.email?.split("@")[0],
      email: payload.email,
      password: payload.password,
    };

    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const token = res?.token || res?.access_token || res?.accessToken;
    if (token) {
      setStoredToken(token);
    }
    const user = res?.user || {
      username: body.username,
      email: body.email,
      userId: res?.userId,
    };
    setCachedUser(user);

    return { ...res, user, token };
  },

  /**
   * Alias for register to support both signup/register conventions
   */
  async signup(data) {
    return this.register(data);
  },

  /**
   * Login user { username / email, password }
   * Endpoint: POST http://localhost:3001/auth/login
   */
  async login(credentials, maybePassword) {
    let body;
    if (typeof credentials === "string") {
      body = {
        username: credentials,
        email: credentials,
        password: maybePassword,
      };
    } else {
      const payload = typeof credentials === "string" ? JSON.parse(credentials) : credentials;
      body = {
        username: payload.username || payload.email || payload.identifier,
        email: payload.email || payload.username || payload.identifier,
        password: payload.password,
      };
    }

    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const token = res?.token || res?.access_token || res?.accessToken;
    if (token) {
      setStoredToken(token);
    }
    const user = res?.user || {
      username: body.username,
      email: body.email,
    };
    setCachedUser(user);

    return { ...res, user, token };
  },

  /**
   * Fetch current user session
   */
  async getCurrentUser() {
    try {
      const res = await apiFetch("/auth/me");
      if (res) {
        setCachedUser(res?.user || res);
      }
      return res?.user || res;
    } catch {
      return null;
    }
  },

  /**
   * Log out user and clear stored tokens
   */
  async logout() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // Continue cleanup regardless
    } finally {
      removeStoredToken();
    }
    return { success: true };
  },
};