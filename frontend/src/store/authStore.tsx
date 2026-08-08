import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  login: (email: string, password: string) => Promise<void>
  signup: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          if (!response.ok) {
            throw new Error('Login failed')
          }

          const { user, token } = (await response.json()) as { user: User; token: string }
          set({ user, token, isAuthenticated: true })
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (fullName, email, password) => {
        set({ isLoading: true })
        try {
          // TODO: call API
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setUser: (user) => set({ user }),
    }),
    { name: 'auth-storage', partialize: (s) => ({ token: s.token, user: s.user }) }
  )
)
