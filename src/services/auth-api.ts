import { axiosInstance } from "./axios";

export interface TokenRequest {
  grantType: "authorization_code";
  code: string;
  redirectUri: string;
}

export interface AuthenticationResponse {
  accessToken: string;
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
 * Handles login and incremental auth
 */
export const exchangeToken = async (
  request: TokenRequest
): Promise<AuthenticationResponse> => {
  const response = await axiosInstance.post(`${AUTH_URL}/token`, request);
  return response.data;
};

/**
 * Get current authenticated user info
 */
export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await axiosInstance.get(`${AUTH_URL}/me`);
  return response.data;
};
