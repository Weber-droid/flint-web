import { useHistoryStore } from '../../store/historyStore'
import { Clock, Trash2 } from 'lucide-react'

export function HistoryPanel() {
  const { history, clearHistory } = useHistoryStore()

  const getMethodColor = (method: string) => {
    const map: Record<string, string> = {
      GET: 'text-method-get-text',
      POST: 'text-method-post-text',
      PUT: 'text-method-put-text',
      DELETE: 'text-method-delete-text',
    }
    return map[method] || map.GET
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-method-get-text'
    if (status >= 400) return 'text-method-delete-text'
    return 'text-method-post-text'
  }

  return (
    <div className="flex flex-col h-full bg-background border-r border-border text-sm">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2 text-secondary">
          <Clock size={16} />
          <span className="font-medium">History</span>
        </div>
        <button 
          onClick={() => clearHistory()}
          className="p-1.5 text-secondary hover:text-method-delete-text bg-surface border border-border rounded hover:bg-border transition-colors"
          title="Clear History"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center text-secondary p-4 mt-4 text-xs">
            No requests sent yet.
            <div className="mt-1 opacity-50">Send a request to see it here.</div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {history.map(entry => (
              <div 
                key={entry.id}
                onClick={() => {
                  // Rehydrate request logic would go here
                }}
                className="p-3 hover:bg-surface cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold ${getMethodColor(entry.method)} w-10`}>
                      {entry.method}
                    </span>
                    <span className={`text-xs font-mono font-medium ${getStatusColor(entry.statusCode)}`}>
                      {entry.statusCode}
                    </span>
                  </div>
                  <span className="text-[10px] text-secondary">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="font-mono text-xs text-secondary group-hover:text-primary truncate">
                  {entry.url}
                </div>
                <div className="text-[10px] text-secondary mt-1">
                  {entry.durationMs} ms
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
