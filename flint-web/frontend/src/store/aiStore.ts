import { create } from 'zustand'

interface AIState {
  isOpen: boolean
  isGenerating: boolean
  toggleDrawer: () => void
  setGenerating: (generating: boolean) => void
}

export const useAIStore = create<AIState>((set) => ({
  isOpen: false,
  isGenerating: false,
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  setGenerating: (generating) => set({ isGenerating: generating })
}))
