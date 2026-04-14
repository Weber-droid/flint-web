import { create } from 'zustand'
import { HistoryEntry, db } from '../lib/db'

interface HistoryState {
  history: HistoryEntry[]
  isLoading: boolean
  loadHistory: () => Promise<void>
  clearHistory: () => Promise<void>
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  isLoading: true,

  loadHistory: async () => {
    set({ isLoading: true })
    try {
      const history = await db.history.orderBy('timestamp').reverse().toArray()
      set({ history })
    } finally {
      set({ isLoading: false })
    }
  },

  clearHistory: async () => {
    await db.history.clear()
    set({ history: [] })
  }
}))
