/**
 * OAuth callback route for redirect-based flow
 * 
 * Google redirects back here with an authorization code that needs to be exchanged for tokens.
 */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthProvider";
import { useEffect, useState } from "react";
import { loginWithGoogle } from "@/services/auth-api";
import { GOOGLE_REDIRECT_URI } from "@/lib/google-auth";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: (search.code as string) || "",
      error: (search.error as string) || "",
      state: (search.state as string) || "",
    };
  },
});

function AuthCallback() {
  const navigate = useNavigate();
  const { setTokens } = useAuth();
  const { code, error, state } = Route.useSearch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const handleCallback = async () => {
      // Check for error from Google
      if (error) {
        console.error("Authentication failed:", error);
        setErrorMessage(error);
        
        // Redirect to login after showing error
        setTimeout(() => {
          navigate({ to: "/login", search: { redirect: "/" } });
        }, 3000);
        return;
      }

      // Check if we have the authorization code
      if (!code) {
        console.error("Missing authorization code");
        setErrorMessage("Authentication failed. Missing authorization code.");
        
        setTimeout(() => {
          navigate({ to: "/login", search: { redirect: "/" } });
        }, 3000);
        return;
      }

      try {
        // Exchange code for tokens
        const response = await loginWithGoogle(code, GOOGLE_REDIRECT_URI);
        
        // Store tokens in context and localStorage
        setTokens(response.accessToken, response.refreshToken, response.expiresIn);
        
        // Redirect to the original page or events
        const redirectTo = state || "/events";
        navigate({ to: redirectTo });
      } catch (err) {
        console.error("Failed to authenticate:", err);
        setErrorMessage("Authentication failed. Please try again.");
        
        setTimeout(() => {
          navigate({ to: "/login", search: { redirect: "/" } });
        }, 3000);
      }
    };

    handleCallback();
  }, [code, error, state, navigate, setTokens]);

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
