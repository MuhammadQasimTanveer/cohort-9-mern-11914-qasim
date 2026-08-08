import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../api/auth';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await authAPI.login({ email, password });
          if(data){
            set({ 
              user: data.user, 
              token: data.token, 
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },  

      signup: async (fullName, email, password) => {
        try {
          const { data } = await authAPI.register({ fullName, email, password });
          set({ 
            user: data.user, 
            token: data.token, 
            isAuthenticated: true,
          });
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Signup failed');
        }
      },

      forgotPassword: async (email) => {
        try {
          await authAPI.forgotPassword({ email });
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },

      logout: () => {
        // Clear token from axios headers
        localStorage.removeItem('accessToken');
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user) => set({ user }),
      
    }),
    { 
      name: 'auth-storage', 
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
