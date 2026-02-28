import { Store } from '@tanstack/react-store';
import { UserDto, getCurrentUser, refreshAccessToken } from '@/services/auth-api';
import { axiosInstance } from '@/services/axios';

export interface AuthState {
  user: UserDto | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

// Create the store
export const authStore = new Store<AuthState>({
  user: null,
  loading: true,
  accessToken: null,
  refreshToken: null,
});

// Selectors
export const selectIsAuthenticated = (state: AuthState) => !!state.user && !!state.accessToken;

// Actions
export const setTokens = (accessToken: string, refreshToken: string, expiresIn: number) => {
  authStore.setState((state) => ({
    ...state,
    accessToken,
    refreshToken,
  }));
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem('tokenExpiresAt', expiresAt.toString());
  }
};

export const clearTokens = () => {
  authStore.setState(() => ({
    user: null,
    loading: false,
    accessToken: null,
    refreshToken: null,
  }));
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
  }
};

export const setUser = (user: UserDto | null) => {
  authStore.setState((state) => ({
    ...state,
    user,
  }));
};

export const setLoading = (loading: boolean) => {
  authStore.setState((state) => ({
    ...state,
    loading,
  }));
};

export const refreshAuth = async () => {
  try {
    if (typeof window === 'undefined') return;
    
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      clearTokens();
      return;
    }

    const response = await refreshAccessToken(storedRefreshToken);
    
    authStore.setState((state) => ({
      ...state,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    }));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      const expiresAt = Date.now() + response.expiresIn * 1000;
      localStorage.setItem('tokenExpiresAt', expiresAt.toString());
    }
    
    const userData = await getCurrentUser();
    setUser(userData);
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearTokens();
  }
};

export const loadUser = async () => {
  try {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    
    const token = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('tokenExpiresAt');

    if (!token) {
      setLoading(false);
      return;
    }

    // Check if token is expired
    if (expiresAt && Date.now() >= parseInt(expiresAt)) {
      await refreshAuth();
    } else {
      const userData = await getCurrentUser();
      axiosInstance.defaults.headers['X-User-Id'] = userData.id;
      setUser(userData);
      authStore.setState((state) => ({
        ...state,
        accessToken: token,
      }));
    }
  } catch (error) {
    console.error('Failed to load user:', error);
    clearTokens();
  } finally {
    setLoading(false);
  }
};
