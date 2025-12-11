import { Store } from '@tanstack/react-store';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Create the store
export const authStore = new Store<AuthState>({
  user: null,
  isAuthenticated: false,
});

// Actions
export const login = (user: User) => {
  authStore.setState(() => ({ user, isAuthenticated: true }));
};

export const logout = () => {
  authStore.setState(() => ({ user: null, isAuthenticated: false }));
};
