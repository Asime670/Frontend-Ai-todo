"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "@/services/authService";
import { getStoredToken, getCachedUser, setCachedUser, removeStoredToken } from "@/lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth on client mount
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        const cached = getCachedUser();
        if (cached && isMounted) {
          setUser(cached);
        }

        const token = getStoredToken();
        if (token) {
          const remoteUser = await authService.getCurrentUser();
          if (remoteUser && isMounted) {
            setUser(remoteUser);
          }
        }
      } catch (err) {
        console.warn("Auth initialization note:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const res = await authService.login(email, password);
      const currentUser = res.user || { email, name: email.split("@")[0] };
      setUser(currentUser);
      setCachedUser(currentUser);
      return currentUser;
    } catch (err) {
      setError(err.message || "Failed to log in");
      throw err;
    }
  }, []);

  const signup = useCallback(async (payload) => {
    setError(null);
    try {
      const res = await authService.signup(payload);
      const currentUser = res.user || {
        email: payload.email,
        name: payload.name || payload.email.split("@")[0],
      };
      setUser(currentUser);
      setCachedUser(currentUser);
      return currentUser;
    } catch (err) {
      setError(err.message || "Failed to create account");
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      removeStoredToken();
    }
  }, []);

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      setCachedUser(next);
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
