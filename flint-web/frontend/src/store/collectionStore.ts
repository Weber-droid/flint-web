import { create } from 'zustand'
import { Collection } from '../types/collection'
import { Request } from '../types/request'
import { db } from '../lib/db'

interface CollectionState {
  collections: Collection[]
  requests: Request[]
  isLoading: boolean
  loadCollections: () => Promise<void>
  createCollection: (name: string, parentId?: string) => Promise<void>
  deleteCollection: (id: string) => Promise<void>
}

export const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  requests: [],
  isLoading: true,

  loadCollections: async () => {
    set({ isLoading: true })
    try {
      const collections = await db.collections.toArray()
      const requests = await db.requests.toArray()
      set({ collections, requests })
    } finally {
      set({ isLoading: false })
    }
  },

  createCollection: async (name, parentId) => {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      parentId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    await db.collections.add(newCollection)
    set((state) => ({ collections: [...state.collections, newCollection] }))
  },

  deleteCollection: async (id) => {
    await db.collections.delete(id)
    set((state) => ({ collections: state.collections.filter(c => c.id !== id) }))
  }
}))
