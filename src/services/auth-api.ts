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
