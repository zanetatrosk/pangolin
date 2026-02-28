import { axiosInstance } from "./axios";

export interface TokenRequest {
  grantType: "authorization_code" | "refresh_token";
  code?: string;
  redirectUri?: string;
  refreshToken?: string;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserDto;
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
 * Unified token endpoint for all authentication operations
 * Handles login, incremental auth, and token refresh
 */
export const exchangeToken = async (
  request: TokenRequest
): Promise<AuthenticationResponse> => {
  const response = await axiosInstance.post(`${AUTH_URL}/token`, request);
  return response.data;
};

/**
 * Login with Google using authorization code
 * Uses the unified token endpoint with grant_type=authorization_code
 */
export const loginWithGoogle = async (
  code: string,
  redirectUri: string = 'postmessage'
): Promise<AuthenticationResponse> => {
  return exchangeToken({
    grantType: "authorization_code",
    code,
    redirectUri,
  });
};

/**
 * Handle incremental authorization
 * Uses the unified token endpoint with grant_type=authorization_code
 * The backend will detect this is incremental auth based on the JWT token in headers
 */
export const incrementalAuth = async (
  code: string,
  redirectUri: string = 'postmessage'
): Promise<AuthenticationResponse> => {
  return exchangeToken({
    grantType: "authorization_code",
    code,
    redirectUri,
  });
};

/**
 * Refresh access token using refresh token
 * Uses the unified token endpoint with grant_type=refresh_token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<AuthenticationResponse> => {
  return exchangeToken({
    grantType: "refresh_token",
    refreshToken,
  });
};

/**
 * Get current authenticated user info
 */
export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await axiosInstance.get(`${AUTH_URL}/me`);
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
