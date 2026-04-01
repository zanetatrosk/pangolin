import { Store } from '@tanstack/react-store';
import { UserDto, getCurrentUser } from '@/services/auth-api';
import { axiosInstance } from '@/services/axios';

export interface AuthState {
  user: UserDto | null;
  loading: boolean;
  accessToken: string | null;
}

// Create the store
export const authStore = new Store<AuthState>({
  user: null,
  loading: true,
  accessToken: null,
});

// Selectors
export const selectIsAuthenticated = (state: AuthState) => !!state.user && !!state.accessToken;

// Actions
export const setTokens = (accessToken: string, expiresIn: number) => {
  authStore.setState((state) => ({
    ...state,
    accessToken,
  }));
  
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('accessToken', accessToken);
    
    const expiresAt = Date.now() + expiresIn * 1000;
    sessionStorage.setItem('tokenExpiresAt', expiresAt.toString());

    // Clear legacy persistence (in case an older build stored tokens in localStorage)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpiresAt');
  }
};

export const clearTokens = () => {
  authStore.setState(() => ({
    user: null,
    loading: false,
    accessToken: null,
  }));
  
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('tokenExpiresAt');

    // Clear legacy persistence (in case an older build stored tokens in localStorage)
    localStorage.removeItem('accessToken');
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

export const loadUser = async () => {
  try {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    
    const token = sessionStorage.getItem('accessToken');
    const expiresAt = sessionStorage.getItem('tokenExpiresAt');

    if (!token) {
      setLoading(false);
      return;
    }

    // Check if token is expired
    if (expiresAt && Date.now() >= parseInt(expiresAt)) {
      clearTokens();
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
