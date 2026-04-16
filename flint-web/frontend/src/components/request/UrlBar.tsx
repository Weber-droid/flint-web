import { useState } from 'react'
import { useRequestStore } from '../../store/requestStore'
import { ChevronDown, Play, Loader2 } from 'lucide-react'

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']

const getMethodColors = (method: string) => {
  const map: Record<string, string> = {
    GET: 'text-method-get-text bg-method-get-bg',
    POST: 'text-method-post-text bg-method-post-bg',
    PUT: 'text-method-put-text bg-method-put-bg',
    DELETE: 'text-method-delete-text bg-method-delete-bg',
    PATCH: 'text-method-patch-text bg-method-patch-bg',
    HEAD: 'text-method-head-text bg-method-head-bg',
    OPTIONS: 'text-method-options-text bg-method-options-bg',
  }
  return map[method] || map.GET
}

export function UrlBar() {
  const { activeRequest, updateActiveRequest, sendRequest, cancelRequest, isLoading } = useRequestStore()
  const [showMethods, setShowMethods] = useState(false)

  if (!activeRequest) return null

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      sendRequest()
    }
  }

  return (
    <div className="flex w-full space-x-2 bg-surface p-4 border-b border-border">
      <div className="relative">
        <button
          onClick={() => setShowMethods(!showMethods)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md font-mono font-bold text-sm h-10 border border-border focus-ring hover:brightness-110 transition-all ${getMethodColors(activeRequest.method)}`}
        >
          <span>{activeRequest.method}</span>
          <ChevronDown size={14} />
        </button>
        {showMethods && (
          <div className="absolute top-full left-0 mt-1 w-32 bg-surface border border-border rounded-md shadow-lg z-50">
            {methods.map(m => (
              <button
                key={m}
                className={`w-full text-left px-3 py-2 text-sm font-mono hover:bg-border transition-colors ${getMethodColors(m).split(' ')[0]}`}
                onClick={() => {
                  updateActiveRequest({ method: m as any })
                  setShowMethods(false)
                }}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        <input
          type="text"
          value={activeRequest.url}
          onChange={(e) => updateActiveRequest({ url: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder="https://api.example.com/endpoint"
          className="w-full h-10 px-4 bg-background border border-border rounded-md font-mono text-primary placeholder-secondary focus-ring transition-all"
        />
      </div>

      <button
        onClick={isLoading ? cancelRequest : sendRequest}
        className="flex items-center space-x-2 bg-accent text-white px-6 py-2 rounded-md font-medium hover:bg-accent/90 transition-all focus-ring h-10"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Cancel</span>
          </>
        ) : (
          <>
            <Play size={16} />
            <span>Send</span>
          </>
        )}
      </button>
    </div>
  )
}
