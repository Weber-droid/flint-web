export interface ResponseMetrics {
  durationMs: number
  sizeBytes: number
}

export interface HttpResponse {
  id: string
  requestId: string
  status: number
  statusText: string
  headers: Record<string, string>
  body: string | Blob
  metrics: ResponseMetrics
  createdAt: number
  error?: string
}
