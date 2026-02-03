import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthProvider";
import { useEffect, useState } from "react";
import { PATHS } from "@/paths";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      accessToken: (search.accessToken as string) || "",
      refreshToken: (search.refreshToken as string) || "",
      expiresIn: (search.expiresIn as string) || "",
      error: (search.error as string) || "",
      state: (search.state as string) || "",
    };
  },
});

function AuthCallback() {
  const navigate = useNavigate();
  const { setTokens } = useAuth();
  const { accessToken, refreshToken, expiresIn, error, state } = Route.useSearch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const handleCallback = () => {
      // Check for error from backend
      if (error) {
        console.error("Authentication failed:", error);
        setErrorMessage(error);
        
        // Redirect to login after showing error
        setTimeout(() => {
          navigate({ to: "/login",  search: { redirect: PATHS.EVENTS.LIST} });
        }, 3000);
        return;
      }

      // Check if we have all required tokens
      if (!accessToken || !refreshToken || !expiresIn) {
        console.error("Missing tokens in callback");
        setErrorMessage("Authentication failed. Missing tokens.");
        
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 3000);
        return;
      }

      try {
        // Store tokens in context and localStorage
        setTokens(accessToken, refreshToken, parseInt(expiresIn));
        
        // Redirect to the original page or home
        const redirectTo = state || "/";
        navigate({ to: redirectTo });
      } catch (err) {
        console.error("Failed to store tokens:", err);
        setErrorMessage("Authentication failed. Please try again.");
        
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 3000);
      }
    };

    handleCallback();
  }, [accessToken, refreshToken, expiresIn, error, state, navigate, setTokens]);

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-700">Completing authentication...</p>
      </div>
    </div>
  );
}
