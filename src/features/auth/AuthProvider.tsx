import { FC, ReactNode, useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { authStore, loadUser, refreshAuth, setTokens, selectIsAuthenticated } from "@/stores/authStore";

export const useAuth = () => {
  const user = useStore(authStore, (state) => state.user);
  const loading = useStore(authStore, (state) => state.loading);
  const accessToken = useStore(authStore, (state) => state.accessToken);
  const isAuthenticated = useStore(authStore, selectIsAuthenticated);

  return {
    user,
    loading,
    isAuthenticated,
    setTokens,
    refreshAuth,
  };
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const accessToken = useStore(authStore, (state) => state.accessToken);

  // Load user data on mount
  useEffect(() => {
    loadUser();
  }, [accessToken]);

  // Setup automatic token refresh before expiration
  useEffect(() => {
    if (!accessToken || typeof window === "undefined") return;

    const expiresAt = localStorage.getItem("tokenExpiresAt");
    if (!expiresAt) return;

    const expiresIn = parseInt(expiresAt) - Date.now();
    // Refresh token 5 minutes before it expires
    const refreshTime = expiresIn - 5 * 60 * 1000;

    if (refreshTime > 0) {
      const timeoutId = setTimeout(() => {
        refreshAuth();
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }
  }, [accessToken]);

  return <>{children}</>;
};