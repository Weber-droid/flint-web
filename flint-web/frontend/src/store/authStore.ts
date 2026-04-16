import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface AuthState {
  user: any | null
  plan: 'free' | 'pro'
  isLoading: boolean
  checkSession: () => Promise<void>
  logout: () => Promise<void>
  devLogin: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  plan: 'free',
  isLoading: true,
  checkSession: async () => {
    set({ isLoading: true })
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      set({ user: session.user, plan: 'pro', isLoading: false })
    } else {
      set({ user: null, plan: 'free', isLoading: false })
    }
  },
  devLogin: () => {
    set({ user: { email: 'developer@flint.io', id: 'dev-123' }, plan: 'pro', isLoading: false })
  },
  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, plan: 'free' })
  }
}))
