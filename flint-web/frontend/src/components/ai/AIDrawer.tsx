import React, { useEffect, useState, useRef } from 'react'
import { useAIStore } from '../../store/aiStore'
import { useRequestStore } from '../../store/requestStore'
import { X, Sparkles, Send, Loader2 } from 'lucide-react'

export function AIDrawer() {
  const { isOpen, toggleDrawer } = useAIStore()
  const { activeRequest, lastResponse } = useRequestStore()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (!isOpen) return null

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return
    
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsStreaming(true)

    try {
      const res = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          context: { request: activeRequest, response: lastResponse }
        })
      })

      if (!res.body) throw new Error('No response body')
      
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      
      setMessages(prev => [...prev, { role: 'ai', content: '' }])

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        
        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
              const data = line.replace('data: ', '')
              setMessages(prev => {
                const newMsgs = [...prev]
                newMsgs[newMsgs.length - 1].content += data
                return newMsgs
              })
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Error generating response.' }])
    } finally {
      setIsStreaming(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[360px] bg-surface border-l border-border flex flex-col shadow-2xl z-40 transform transition-transform duration-200">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2 text-accent font-medium">
          <Sparkles size={18} />
          <span>Flint AI</span>
        </div>
        <button onClick={toggleDrawer} className="text-secondary hover:text-primary transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-secondary text-sm text-center mt-10">
            Ask anything about your current request or response.
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'ai' ? 'border-l-2 border-accent pl-3' : 'items-end'}`}>
            <div className={`p-3 rounded-lg text-sm max-w-[90%] ${msg.role === 'ai' ? 'bg-background' : 'bg-border'}`}>
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          </div>
        ))}
        {isStreaming && messages[messages.length - 1]?.role === 'user' && (
          <div className="border-l-2 border-accent pl-3">
            <Loader2 size={16} className="animate-spin text-accent" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border">
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Flint AI..."
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-primary placeholder-secondary focus-ring resize-none"
            rows={3}
          />
          <button 
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
            className="absolute bottom-2 right-2 text-accent disabled:text-secondary disabled:opacity-50 transition-colors p-1 rounded-md hover:bg-surface"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-xs text-secondary mt-2 text-right">
          {input.length} chars
        </div>
      </div>
    </div>
  )
}
