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
import { buildGoogleOAuthUrl, FORMS_SCOPES } from '@/lib/google-auth';
import { useTranslation } from 'react-i18next';

interface GoogleFormIntegrationProps {
  value?: string;
  onChange?: (value: string) => void;
}
export const GoogleFormIntegration: FC<GoogleFormIntegrationProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  // Check if user has Google Forms access
  const { data: accessStatus, isLoading: isCheckingAccess } = useQuery({
    queryKey: ['google-forms-access'],
    queryFn: checkFormsAccess,
  });

  const handleGrantAccess = () => {
    const scope = FORMS_SCOPES.join(' ');
    
    const url = buildGoogleOAuthUrl({
      scope,
      state: 'type=incremental', // Pass type parameter to indicate this is incremental auth
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
          <CardDescription className='break-all'>
            {t('eventDetail.googleFormIntegration.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!accessStatus?.hasAccess ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>{t('eventDetail.googleFormIntegration.needsAccess')}</span>
                <Button 
                  onClick={handleGrantAccess} 
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  {t('eventDetail.googleFormIntegration.grantAccess')}
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                {t('eventDetail.googleFormIntegration.accessGranted')}
              </AlertDescription>
            </Alert>
          )}
            <Input
              type="text"
              placeholder={t('eventDetail.googleFormIntegration.formIdPlaceholder')}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={!accessStatus?.hasAccess}
              className="w-full"
            />
          
        </CardContent>
      </Card>
    </div>
  );
};
