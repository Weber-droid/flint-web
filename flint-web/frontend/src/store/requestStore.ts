import { create } from 'zustand'
import { Request } from '../types/request'
import { HttpResponse } from '../types/response'
import axios from 'axios'
import { db } from '../lib/db'
import { useEnvironmentStore } from './environmentStore'

interface RequestState {
  openRequests: Request[]
  activeRequestId: string | null
  activeRequest: Request | null
  lastResponse: HttpResponse | null
  isLoading: boolean
  abortController: AbortController | null
  addTab: (req?: Request) => void
  closeTab: (id: string) => void
  setActiveRequest: (id: string) => void
  updateActiveRequest: (updates: Partial<Request>) => void
  sendRequest: () => Promise<void>
  cancelRequest: () => void
  saveRequest: () => Promise<void>
}

export const createDefaultRequest = (): Request => ({
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

const substituteEnvVars = (text: string, vars: { key: string, value: string }[]) => {
  if (!text) return text
  let result = text
  vars.forEach(v => {
    const regex = new RegExp(`\\{\\{${v.key}\\}\\}`, 'g')
    result = result.replace(regex, v.value)
  })
  return result
}

export const useRequestStore = create<RequestState>((set, get) => ({
  openRequests: [createDefaultRequest()],
  get activeRequestId() {
    return get().openRequests[0]?.id || null
  },
  get activeRequest() {
    return get().openRequests[0] || null
  },
  lastResponse: null,
  isLoading: false,
  abortController: null,

  addTab: (req) => {
    const newReq = req || createDefaultRequest()
    set((state) => {
      const exists = state.openRequests.find(r => r.id === newReq.id)
      if (exists) {
        return { activeRequestId: newReq.id, activeRequest: exists, lastResponse: null }
      }
      return {
        openRequests: [...state.openRequests, newReq],
        activeRequestId: newReq.id,
        activeRequest: newReq,
        lastResponse: null
      }
    })
  },

  closeTab: (id) => {
    set((state) => {
      const newRequests = state.openRequests.filter(r => r.id !== id)
      if (newRequests.length === 0) {
        const defaultReq = createDefaultRequest()
        return { openRequests: [defaultReq], activeRequestId: defaultReq.id, activeRequest: defaultReq, lastResponse: null }
      }
      const activeId = state.activeRequestId === id ? newRequests[newRequests.length - 1].id : state.activeRequestId
      const activeReq = newRequests.find(r => r.id === activeId) || null
      return { openRequests: newRequests, activeRequestId: activeId, activeRequest: activeReq, lastResponse: null }
    })
  },

  setActiveRequest: (id) => {
    set((state) => {
      const req = state.openRequests.find(r => r.id === id) || null
      return { activeRequestId: id, activeRequest: req, lastResponse: null }
    })
  },

  updateActiveRequest: (updates) => set((state) => {
    if (!state.activeRequest) return {}
    const updated = { ...state.activeRequest, ...updates, updatedAt: Date.now() }
    const newOpen = state.openRequests.map(r => r.id === updated.id ? updated : r)
    return { activeRequest: updated, openRequests: newOpen }
  }),

  saveRequest: async () => {
    const { activeRequest } = get()
    if (!activeRequest || !activeRequest.collectionId) return
    await db.requests.put(activeRequest)
  },

  sendRequest: async () => {
    const { activeRequest } = get()
    if (!activeRequest) return

    const envStore = useEnvironmentStore.getState()
    const activeEnv = envStore.environments.find(e => e.id === envStore.activeEnvironmentId)
    const envVars = activeEnv ? activeEnv.variables.filter(v => v.enabled).map(v => ({ key: v.key, value: v.value })) : []

    const subUrl = substituteEnvVars(activeRequest.url, envVars)
    const subBody = substituteEnvVars(activeRequest.body, envVars)
    
    const headers = activeRequest.headers.reduce((acc, h) => {
      if (h.enabled && h.key) {
        return { ...acc, [h.key]: substituteEnvVars(h.value, envVars) }
      }
      return acc
    }, {} as Record<string, string>)

    const params = activeRequest.params.reduce((acc, p) => {
      if (p.enabled && p.key) {
        return { ...acc, [p.key]: substituteEnvVars(p.value, envVars) }
      }
      return acc
    }, {} as Record<string, string>)

    const controller = new AbortController()
    set({ isLoading: true, abortController: controller, lastResponse: null })

    try {
      const res = await axios.post('/api/proxy', {
        method: activeRequest.method,
        url: subUrl,
        headers,
        body: subBody,
        params
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
        url: subUrl,
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
