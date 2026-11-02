import { getStoredToken } from "./auth";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status = 500, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Core fetch wrapper with centralized token injection and error normalization
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  const token = getStoredToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    credentials: options.credentials || "include",
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 204) {
      return null;
    }

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : null;
    }

    if (!response.ok) {
      let message = "Request failed";
      if (Array.isArray(data?.message)) {
        message = data.message.join(". ");
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
      } else if (data?.detail) {
        message = data.detail;
      } else {
        message = `Request failed with status ${response.status}`;
      }
      throw new ApiError(message, response.status, data);
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(
      err.message || "Network error. Please verify backend server is reachable.",
      0,
      null
    );
  }
}

export const api = {
  get: (endpoint, options) => apiFetch(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) =>
    apiFetch(endpoint, {
      ...options,
      method: "POST",
      body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
    }),
  put: (endpoint, body, options) =>
    apiFetch(endpoint, {
      ...options,
      method: "PUT",
      body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
    }),
  patch: (endpoint, body, options) =>
    apiFetch(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
    }),
  delete: (endpoint, options) =>
    apiFetch(endpoint, { ...options, method: "DELETE" }),
  getBaseUrl: () => API_BASE_URL,
};
