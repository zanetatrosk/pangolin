import { axiosInstance } from "./axios";

export interface GoogleAuthUrlResponse {
  authUrl: string;
}

export interface AuthenticationRequest {
  code: string;
  redirectUri: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserDto {
  id: string;
  email: string;
  provider: string;
  hasProfile: boolean;
  grantedScopes: string[];
}

const AUTH_URL = "/auth";

/**
 * Get Google OAuth2 authorization URL for initial sign-in
 */
export const getGoogleAuthUrl = async (): Promise<GoogleAuthUrlResponse> => {
  const response = await axiosInstance.get(`${AUTH_URL}/google/login`);
  return response.data;
};

/**
 * Handle Google OAuth2 callback
 * Send the authorization code received from Google
 */
export const authenticateWithGoogle = async (
  code: string,
  redirectUri: string
): Promise<AuthenticationResponse> => {
  const response = await axiosInstance.post(`${AUTH_URL}/google/callback`, {
    code,
    redirectUri,
  });
  return response.data;
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<AuthenticationResponse> => {
  const response = await axiosInstance.post(`${AUTH_URL}/refresh`, {
    refreshToken,
  });
  return response.data;
};

/**
 * Get current authenticated user info
 */
export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await axiosInstance.get(`${AUTH_URL}/me`);
  return response.data;
};

/**
 * Get authorization URL for incremental authorization (e.g., for Google Forms access)
 */
export const getIncrementalAuthUrl = async (
  scopes: string
): Promise<GoogleAuthUrlResponse> => {
  const response = await axiosInstance.get(
    `${AUTH_URL}/google/incremental-auth-url`,
    {
      params: { scopes },
    }
  );
  return response.data;
};

/**
 * Handle incremental authorization callback
 */
export const handleIncrementalAuth = async (
  code: string,
  redirectUri: string
): Promise<{ message: string }> => {
  const response = await axiosInstance.post(
    `${AUTH_URL}/google/incremental-callback`,
    {
      code,
      redirectUri,
    }
  );
  return response.data;
};

/**
 * Logout endpoint
 */
export const logout = async (): Promise<{ message: string }> => {
  const response = await axiosInstance.post(`${AUTH_URL}/logout`);
  return response.data;
};
