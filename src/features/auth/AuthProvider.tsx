import { FC, ReactNode, useEffect } from "react";
import { useStore } from "@tanstack/react-store";
import { authStore, loadUser, setTokens, selectIsAuthenticated } from "@/stores/authStore";

export const useAuth = () => {
  const user = useStore(authStore, (state) => state.user);
  const loading = useStore(authStore, (state) => state.loading);
  const isAuthenticated = useStore(authStore, selectIsAuthenticated);

  return {
    user,
    loading,
    isAuthenticated,
    setTokens,
  };
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const accessToken = useStore(authStore, (state) => state.accessToken);

  // Load user data on mount
  useEffect(() => {
    loadUser();
  }, [accessToken]);

  return <>{children}</>;
};