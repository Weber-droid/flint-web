import { create } from 'zustand'
import { Environment } from '../types/environment'
import { db } from '../lib/db'

interface EnvironmentState {
  environments: Environment[]
  activeEnvironmentId: string | null
  isLoading: boolean
  loadEnvironments: () => Promise<void>
  setActive: (id: string) => Promise<void>
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  environments: [],
  activeEnvironmentId: null,
  isLoading: true,

  loadEnvironments: async () => {
    set({ isLoading: true })
    try {
      const environments = await db.environments.toArray()
      const active = environments.find(e => e.isActive)
      set({ environments, activeEnvironmentId: active?.id || null })
    } finally {
      set({ isLoading: false })
    }
  },

  setActive: async (id: string) => {
    const { environments } = useEnvironmentStore.getState()
    const updated = environments.map(e => ({ ...e, isActive: e.id === id }))
    await db.environments.bulkPut(updated)
    set({ environments: updated, activeEnvironmentId: id })
  }
}))
