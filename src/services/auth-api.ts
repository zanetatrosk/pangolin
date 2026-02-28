import { axiosInstance } from "./axios";

export interface AuthenticationRequest {
  code: string;
  redirectUri?: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDto;
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

export interface AvailableScopesResponse {
  base: string[];
  forms: string[];
}

const AUTH_URL = "/auth";

/**
 * Login with Google using authorization code
 * Send the authorization code received from Google Identity Services
 */
export const loginWithGoogle = async (
  code: string,
  redirectUri: string = 'postmessage'
): Promise<AuthenticationResponse> => {
  const response = await axiosInstance.post(`${AUTH_URL}/google/login`, {
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
 * Get available scopes for Google services
 */
export const getAvailableScopes = async (): Promise<AvailableScopesResponse> => {
  const response = await axiosInstance.get(`${AUTH_URL}/google/available-scopes`);
  return response.data;
};

/**
 * Handle incremental authorization
 * Send the authorization code for additional scopes
 */
export const incrementalAuth = async (
  code: string,
  redirectUri: string = 'postmessage'
): Promise<{ message: string }> => {
  const response = await axiosInstance.post(
    `${AUTH_URL}/google/incremental-auth`,
    {
      code,
      redirectUri,
    }
  );
  return response.data;
};

/**
 * Logout endpoint
 * @param revokeGoogle - Whether to revoke Google tokens
 */
export const logoutApi = async (revokeGoogle: boolean = true): Promise<{ message: string }> => {
  const response = await axiosInstance.post(
    `${AUTH_URL}/logout?revokeGoogle=${revokeGoogle}`
  );
  return response.data;
};
