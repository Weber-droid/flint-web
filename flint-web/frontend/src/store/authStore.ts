import { create } from 'zustand'

interface AuthState {
  user: any | null
  plan: 'free' | 'pro'
  isLoading: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  plan: 'free',
  isLoading: false,
  login: () => set({ user: { name: 'User' }, plan: 'pro' }),
  logout: () => set({ user: null, plan: 'free' })
}))
