import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  checkFormsAccess
} from '@/services/google-forms-api';
import { getAvailableScopes } from '@/services/auth-api';
import { buildGoogleOAuthUrl } from '@/lib/google-auth';
import envConfig from '../../../../env.json';

interface GoogleFormIntegrationProps {
  value?: string;
  onChange?: (value: string) => void;
}
export const GoogleFormIntegration: FC<GoogleFormIntegrationProps> = ({ value, onChange }) => {
  // Check if user has Google Forms access
  const { data: accessStatus, isLoading: isCheckingAccess } = useQuery({
    queryKey: ['google-forms-access'],
    queryFn: checkFormsAccess,
  });

  // Get available scopes
  const { data: availableScopes } = useQuery({
    queryKey: ['available-scopes'],
    queryFn: getAvailableScopes,
  });

  const handleGrantAccess = () => {
    const scope = availableScopes?.forms.join(' ') || 
      'https://www.googleapis.com/auth/forms.body.readonly https://www.googleapis.com/auth/forms.responses.readonly';
    
    const url = buildGoogleOAuthUrl({
      redirectUri: `${envConfig.FE_BASE_URL}/auth/incremental-callback`,
      scope,
      includeGrantedScopes: true,
    });
    
    window.location.href = url;
  };

  if (isCheckingAccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Google Forms Integration</CardTitle>
          <CardDescription>
            Import registration data from a Google Form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!accessStatus?.hasAccess ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>You need to grant access to Google Forms to use this feature.</span>
                <Button 
                  onClick={handleGrantAccess} 
                  size="sm"
                >
                  Grant Access
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Google Forms access granted
              </AlertDescription>
            </Alert>
          )}
            <Input
              type="text"
              placeholder="Enter Google Form ID"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={!accessStatus?.hasAccess}
              className="flex-1"
            />
          
        </CardContent>
      </Card>
    </div>
  );
};
