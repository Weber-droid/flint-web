import { create } from 'zustand'
import { Request, HttpMethod } from '../types/request'
import { HttpResponse } from '../types/response'
import axios from 'axios'
import { db } from '../lib/db'

interface RequestState {
  activeRequestId: string | null
  activeRequest: Request | null
  lastResponse: HttpResponse | null
  isLoading: boolean
  abortController: AbortController | null
  setActiveRequest: (req: Request) => void
  updateActiveRequest: (updates: Partial<Request>) => void
  sendRequest: () => Promise<void>
  cancelRequest: () => void
}

const createDefaultRequest = (): Request => ({
  id: crypto.randomUUID(),
  name: 'New Request',
  method: 'GET',
  url: '',
  headers: [],
  params: [],
  body: '',
  bodyType: 'none',
  auth: { type: 'none' },
  preRequestScript: '',
  testScript: '',
  createdAt: Date.now(),
  updatedAt: Date.now()
})

export const useRequestStore = create<RequestState>((set, get) => ({
  activeRequestId: null,
  activeRequest: createDefaultRequest(),
  lastResponse: null,
  isLoading: false,
  abortController: null,

  setActiveRequest: (req) => set({ activeRequest: req, activeRequestId: req.id, lastResponse: null }),

  updateActiveRequest: (updates) => set((state) => ({
    activeRequest: state.activeRequest ? { ...state.activeRequest, ...updates, updatedAt: Date.now() } : null
  })),

  sendRequest: async () => {
    const { activeRequest } = get()
    if (!activeRequest) return

    const controller = new AbortController()
    set({ isLoading: true, abortController: controller, lastResponse: null })

    try {
      const startTime = Date.now()
      const res = await axios.post('/api/proxy', {
        method: activeRequest.method,
        url: activeRequest.url,
        headers: activeRequest.headers.reduce((acc, h) => (h.enabled && h.key ? { ...acc, [h.key]: h.value } : acc), {}),
        body: activeRequest.body
      }, {
        signal: controller.signal
      })

      const response: HttpResponse = {
        id: crypto.randomUUID(),
        requestId: activeRequest.id,
        status: res.data.status,
        statusText: res.data.statusText,
        headers: res.data.headers,
        body: res.data.body,
        metrics: { durationMs: res.data.durationMs, sizeBytes: res.data.sizeBytes },
        createdAt: Date.now()
      }

      set({ lastResponse: response })
      db.history.add({
        id: response.id,
        timestamp: Date.now(),
        method: activeRequest.method,
        url: activeRequest.url,
        statusCode: response.status,
        durationMs: response.metrics.durationMs
      })

    } catch (error: any) {
      if (axios.isCancel(error)) return
      set({
        lastResponse: {
          id: crypto.randomUUID(),
          requestId: activeRequest.id,
          status: error.response?.status || 0,
          statusText: error.message,
          headers: {},
          body: error.response?.data || error.message,
          metrics: { durationMs: 0, sizeBytes: 0 },
          createdAt: Date.now(),
          error: error.message
        }
      })
    } finally {
      set({ isLoading: false, abortController: null })
    }
  },

  cancelRequest: () => {
    const { abortController } = get()
    if (abortController) {
      abortController.abort()
      set({ isLoading: false, abortController: null })
    }
  }
}))
