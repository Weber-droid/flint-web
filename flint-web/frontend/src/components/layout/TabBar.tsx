import { useRequestStore } from '../../store/requestStore'
import { X, Plus } from 'lucide-react'

const getMethodColor = (method: string) => {
  const map: Record<string, string> = {
    GET: 'text-method-get-text',
    POST: 'text-method-post-text',
    PUT: 'text-method-put-text',
    DELETE: 'text-method-delete-text',
    PATCH: 'text-method-patch-text',
    HEAD: 'text-method-head-text',
    OPTIONS: 'text-method-options-text',
  }
  return map[method] || map.GET
}

export function TabBar() {
  const { openRequests, activeRequestId, setActiveRequest, closeTab, addTab } = useRequestStore()

  return (
    <div className="flex items-center h-10 border-b border-border bg-background overflow-x-auto scrollbar-hide">
      {openRequests.map(req => (
        <div
          key={req.id}
          onClick={() => setActiveRequest(req.id)}
          className={`flex items-center justify-between h-full px-3 min-w-[120px] max-w-[200px] border-r border-border cursor-pointer group transition-colors ${
            activeRequestId === req.id
              ? 'bg-surface border-b-2 border-b-accent'
              : 'hover:bg-surface/50 text-secondary border-b-2 border-b-transparent'
          }`}
        >
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className={`text-xs font-bold ${getMethodColor(req.method)}`}>
              {req.method}
            </span>
            <span className={`text-sm truncate ${activeRequestId === req.id ? 'text-primary' : 'text-secondary'}`}>
              {req.name || 'Untitled'}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeTab(req.id)
            }}
            className="p-1 rounded hover:bg-border opacity-0 group-hover:opacity-100 transition-all text-secondary hover:text-primary"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => addTab()}
        className="h-full px-3 flex items-center justify-center text-secondary hover:text-primary hover:bg-surface transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
