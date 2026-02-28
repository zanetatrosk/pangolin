/**
 * Incremental Authorization Callback Route
 * 
 * Handles the OAuth callback for incremental authorization (e.g., Google Forms access).
 * After successful authorization, redirects back to the home page.
 */
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { incrementalAuth } from '@/services/auth-api';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GOOGLE_INCREMENTAL_REDIRECT_URI } from '@/lib/google-auth';

export const Route = createFileRoute('/auth/incremental-callback')({
  component: IncrementalAuthCallback,
});

function IncrementalAuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');

        if (errorParam) {
          setStatus('error');
          setError(`Authorization failed: ${errorParam}`);
          return;
        }

        if (!code) {
          setStatus('error');
          setError('No authorization code received');
          return;
        }

        // Send the code to the backend with the correct redirect URI
        await incrementalAuth(code, GOOGLE_INCREMENTAL_REDIRECT_URI);

        setStatus('success');

        // Redirect back to the previous page after 2 seconds
        setTimeout(() => {
          navigate({ to: '/', replace: true });
        }, 2000);
      } catch (err) {
        console.error('Incremental auth error:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to update permissions');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Updating Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          {status === 'loading' && (
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>Processing your authorization...</p>
            </div>
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
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
