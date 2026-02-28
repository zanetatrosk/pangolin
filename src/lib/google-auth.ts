/**
 * Google OAuth2 Authentication Utilities
 * 
 * This application uses Google's Authorization Code flow with redirect-based authentication.
 * 
 * Key Features:
 * - Login with Google using redirect flow
 * - Incremental authorization for additional scopes (e.g., Google Forms)
 * - Token refresh handled automatically by axios interceptor
 * - Backend handles token exchange and verification
 * 
 * Usage:
 * 
 * 1. Login:
 *    User clicks login button, is redirected to Google, then back to /auth/callback
 * 
 * 2. Incremental Authorization:
 *    User is redirected to Google for additional scopes, then back to /auth/incremental-callback
 * 
 * 3. Logout:
 *    Call `logout()` from authStore, which revokes Google tokens on the backend
 */

import envConfig from '../../env.json';

export const GOOGLE_CLIENT_ID = envConfig.GOOGLE_CLIENT_ID;
export const GOOGLE_REDIRECT_URI = envConfig.GOOGLE_REDIRECT_URI;

/**
 * Base scopes required for initial login
 */
export const BASE_SCOPES = ['openid', 'email', 'profile'];

/**
 * Google Forms scopes for incremental authorization
 */
export const FORMS_SCOPES = [
  'https://www.googleapis.com/auth/forms.body.readonly',
  'https://www.googleapis.com/auth/forms.responses.readonly',
];

/**
 * Build Google OAuth URL manually to have full control over parameters
 */
export const buildGoogleOAuthUrl = (params: {
  redirectUri: string;
  scope: string;
  prompt?: 'none' | 'consent' | 'select_account' | '';
  state?: string;
  includeGrantedScopes?: boolean;
}) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const urlParams = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: params.redirectUri,
    response_type: 'code',
    scope: params.scope,
    access_type: 'offline',
  });

  if (params.includeGrantedScopes !== false) {
    urlParams.append('include_granted_scopes', 'true');
  }

  if (params.prompt) {
    urlParams.append('prompt', params.prompt);
  }

  if (params.state) {
    urlParams.append('state', params.state);
  }

  return `${baseUrl}?${urlParams.toString()}`;
};
