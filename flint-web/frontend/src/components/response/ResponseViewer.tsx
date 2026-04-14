import React from 'react'
import { MonacoEditor } from '../common/MonacoEditor'
import { useRequestStore } from '../../store/requestStore'

export function ResponseViewer() {
  const { lastResponse } = useRequestStore()

  if (!lastResponse) {
    return (
      <div className="flex-1 flex items-center justify-center text-secondary text-sm bg-background">
        Enter a URL and click Send to get a response
      </div>
    )
  }

  const isJson = lastResponse.headers['content-type']?.includes('application/json')
  let displayBody = lastResponse.body as string
  
  if (isJson && typeof displayBody === 'string') {
    try {
      displayBody = JSON.stringify(JSON.parse(displayBody), null, 2)
    } catch (e) {}
  }

  return (
    <div className="flex flex-col h-full bg-background relative border-t border-border">
      <div className="flex items-center space-x-4 p-2 border-b border-border bg-surface text-xs font-mono">
        <span className={`font-bold ${lastResponse.status >= 200 && lastResponse.status < 300 ? 'text-method-get-text' : lastResponse.status >= 400 ? 'text-method-delete-text' : 'text-method-post-text'}`}>
          {lastResponse.status} {lastResponse.statusText}
        </span>
        <span className="text-secondary">{lastResponse.metrics.durationMs} ms</span>
        <span className="text-secondary">{(lastResponse.metrics.sizeBytes / 1024).toFixed(2)} KB</span>
      </div>
      <div className="flex-1 relative">
        <MonacoEditor 
          value={displayBody} 
          language={isJson ? 'json' : 'html'} 
          readOnly 
        />
      </div>
    </div>
  )
}
