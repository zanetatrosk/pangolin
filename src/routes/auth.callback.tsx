import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/AuthProvider";
import { useEffect, useState } from "react";
import { exchangeToken } from "@/services/auth-api";
import { GOOGLE_REDIRECT_URI } from "@/lib/google-auth";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PATHS } from "@/paths";
import { Loading } from "@/components/ui/loading";

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
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Check if this is incremental auth from state parameter
  const isIncrementalAuth = state?.includes('type=incremental') || false;
  // Extract the actual redirect state (remove type parameter if present)
  const redirectState = state?.replace('type=incremental', '').replace(/^&/, '') || "";
  
  useEffect(() => {
    const handleCallback = async () => {
      // Check for error from Google
      if (error) {
        console.error("Authentication failed:", error);
        setStatus('error');
        setErrorMessage(error);
        
        // Redirect to appropriate page after showing error
        setTimeout(() => {
          if (isIncrementalAuth) {
            navigate({ to: PATHS.HOME, replace: true });
          } else {
            navigate({ to: PATHS.LOGIN, search: { redirect: PATHS.HOME } });
          }
        }, 3000);
        return;
      }

      // Check if we have the authorization code
      if (!code) {
        console.error("Missing authorization code");
        setStatus('error');
        setErrorMessage("Authentication failed. Missing authorization code.");
        
        setTimeout(() => {
          if (isIncrementalAuth) {
            navigate({ to: PATHS.HOME, replace: true });
          } else {
            navigate({ to: PATHS.LOGIN, search: { redirect: PATHS.HOME } });
          }
        }, 3000);
        return;
      }

      try {
        // Exchange code for tokens using unified endpoint
        // Backend automatically detects login vs incremental auth based on JWT presence
        const response = await exchangeToken({
          grantType: "authorization_code",
          code,
          redirectUri: GOOGLE_REDIRECT_URI,
        });
        
        // Store tokens in context and localStorage
        setTokens(response.accessToken, response.expiresIn);
        
        setStatus('success');
        
        // Redirect based on auth type
        setTimeout(() => {
          if (isIncrementalAuth) {
            // For incremental auth, go back to home
            navigate({ to: PATHS.HOME, replace: true });
          } else {
            // For login, redirect to the original page or events
            const redirectTo = redirectState || PATHS.EVENTS.LIST;
            navigate({ to: redirectTo });
          }
        }, isIncrementalAuth ? 2000 : 500);
      } catch (err) {
        console.error("Failed to authenticate:", err);
        setStatus('error');
        setErrorMessage(
          isIncrementalAuth 
            ? "Failed to update permissions. Please try again."
            : "Authentication failed. Please try again."
        );
        
        setTimeout(() => {
          if (isIncrementalAuth) {
            navigate({ to: PATHS.HOME, replace: true });
          } else {
            navigate({ to: PATHS.LOGIN, search: { redirect: PATHS.HOME } });
          }
        }, 3000);
      }
    };

    handleCallback();
  }, [code, error, state, navigate, setTokens, isIncrementalAuth, redirectState]);

  // Show different UI based on auth type
  if (isIncrementalAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Updating Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            {status === 'loading' && (
              <Loading text="Processing your authorization..." />
            )}

            {status === 'success' && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Permissions updated successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default login UI
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
      <Loading text="Completing authentication..." className="text-center" spinnerClassName="h-12 w-12 mx-auto mb-4" textClassName="text-gray-700" />
    </div>
  );
}
