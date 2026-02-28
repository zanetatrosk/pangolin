import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { PATHS } from "@/paths";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Component to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login with return URL
      navigate({ 
        to: PATHS.LOGIN, 
        search: { redirect: router.state.location.pathname } 
      });
    }
  }, [isAuthenticated, loading, navigate, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
