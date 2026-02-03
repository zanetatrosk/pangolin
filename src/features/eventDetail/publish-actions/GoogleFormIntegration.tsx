import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  checkFormsAccess,
  getGoogleForm,
  getGoogleFormResponses,
} from '@/services/google-forms-api';
import { getIncrementalAuthUrl } from '@/services/auth-api';

export const GoogleFormIntegration: FC = () => {
  const [formId, setFormId] = useState('');
  const [submittedFormId, setSubmittedFormId] = useState<string | null>(null);

  // Check if user has Google Forms access
  const { data: accessStatus, isLoading: isCheckingAccess } = useQuery({
    queryKey: ['google-forms-access'],
    queryFn: checkFormsAccess,
  });

  // Get form structure
  const {
    data: formData,
    isLoading: isLoadingForm,
    error: formError,
    refetch: refetchForm,
  } = useQuery({
    queryKey: ['google-form', submittedFormId],
    queryFn: () => getGoogleForm(submittedFormId!),
    enabled: !!submittedFormId && accessStatus?.hasAccess === true,
  });

  // Get form responses
  const {
    data: responsesData,
    isLoading: isLoadingResponses,
    error: responsesError,
  } = useQuery({
    queryKey: ['google-form-responses', submittedFormId],
    queryFn: () => getGoogleFormResponses(submittedFormId!),
    enabled: !!submittedFormId && accessStatus?.hasAccess === true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formId.trim()) {
      setSubmittedFormId(formId.trim());
    }
  };

  const handleGrantAccess = async () => {
    try {
      // Get the incremental auth URL for Google Forms scopes
      const response = await getIncrementalAuthUrl('forms');
      // Redirect user to Google's consent screen
      window.location.href = response.authUrl;
    } catch (error) {
      console.error('Failed to get incremental auth URL:', error);
    }
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
                <Button onClick={handleGrantAccess} size="sm">
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

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Google Form ID"
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
              disabled={!accessStatus?.hasAccess}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!accessStatus?.hasAccess || !formId.trim() || isLoadingForm}
            >
              {isLoadingForm ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load Form'
              )}
            </Button>
          </form>

          {formError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load form: {(formError as Error).message}
              </AlertDescription>
            </Alert>
          )}

          {responsesError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load responses: {(responsesError as Error).message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {formData && (
        <Card>
          <CardHeader>
            <CardTitle>{formData.info.title}</CardTitle>
            {formData.info.description && (
              <CardDescription>{formData.info.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Form Questions</h3>
                <ul className="space-y-2">
                  {formData.items
                    .filter((item) => item.questionItem)
                    .map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.title || `Question ${index + 1}`}
                        {item.questionItem?.question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </li>
                    ))}
                </ul>
              </div>

              {isLoadingResponses ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2">Loading responses...</span>
                </div>
              ) : responsesData && (
                <div>
                  <h3 className="font-semibold mb-2">
                    Responses ({responsesData.responses.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Successfully loaded {responsesData.responses.length} responses
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
