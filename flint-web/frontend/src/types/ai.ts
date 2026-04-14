export interface AIInteraction {
  id: string
  requestId: string
  feature: 'explain' | 'debug' | 'generate' | 'snippet' | 'chat'
  prompt: string
  response: string
  timestamp: number
}

export interface AIChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}
