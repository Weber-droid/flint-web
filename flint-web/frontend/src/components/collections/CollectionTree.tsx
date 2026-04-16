import { Folder, ChevronRight, Plus, MoreVertical } from 'lucide-react'
import { useCollectionStore } from '../../store/collectionStore'
import { useRequestStore } from '../../store/requestStore'
import { useState } from 'react'

export function CollectionTree() {
  const { collections, requests, createCollection, deleteCollection } = useCollectionStore()
  const { addTab } = useRequestStore()
  const [newCollectionName, setNewCollectionName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async () => {
    if (newCollectionName.trim()) {
      await createCollection(newCollectionName.trim())
    }
    setNewCollectionName('')
    setIsCreating(false)
  }

  const handleNewRequest = async (colId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real implementation we would create a DB request and add a tab
    // For now we'll just add a tab
    const { createDefaultRequest } = await import('../../store/requestStore')
    const req = createDefaultRequest()
    req.collectionId = colId
    addTab(req)
  }

  return (
    <div className="flex flex-col h-full bg-background border-r border-border text-sm">
      <div className="p-3 border-b border-border flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Filter collections..." 
          className="flex-1 bg-surface border border-border rounded px-3 py-1.5 text-primary placeholder-secondary focus-ring"
        />
        <button 
          onClick={() => setIsCreating(true)}
          className="p-1.5 text-secondary hover:text-primary bg-surface border border-border rounded hover:bg-border transition-colors"
          title="New Collection"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isCreating && (
          <div className="px-2 mb-2">
            <input
              autoFocus
              value={newCollectionName}
              onChange={e => setNewCollectionName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleCreate()
                if (e.key === 'Escape') setIsCreating(false)
              }}
              onBlur={handleCreate}
              placeholder="Collection name"
              className="w-full bg-surface border border-accent rounded px-2 py-1 text-primary focus:outline-none"
            />
          </div>
        )}

        {collections.length === 0 && requests.length === 0 && !isCreating ? (
          <div className="text-center text-secondary p-4 mt-4 text-xs">
            No collections yet.
            <button onClick={() => setIsCreating(true)} className="block mx-auto mt-2 text-accent hover:underline">
              + Create your first collection
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            {collections.map(col => (
              <div key={col.id} className="group">
                <div className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-surface transition-colors cursor-pointer text-secondary hover:text-primary">
                  <div className="flex items-center space-x-2 overflow-hidden flex-1">
                    <ChevronRight size={14} className="opacity-50 flex-shrink-0" />
                    <Folder size={14} className="text-accent flex-shrink-0" />
                    <span className="truncate">{col.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => handleNewRequest(col.id, e)} className="p-1 hover:bg-border rounded text-secondary hover:text-primary">
                      <Plus size={14} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteCollection(col.id) }} className="p-1 hover:bg-border rounded text-secondary hover:text-method-delete-text">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
                {/* Render child requests here */}
                {requests.filter(r => r.collectionId === col.id).map(req => (
                  <div 
                    key={req.id} 
                    onClick={() => addTab(req)}
                    className="pl-8 pr-2 py-1.5 flex items-center space-x-2 hover:bg-surface cursor-pointer rounded group"
                  >
                    <span className={`text-[10px] font-bold ${getMethodColor(req.method)} w-10`}>{req.method}</span>
                    <span className="truncate text-secondary group-hover:text-primary">{req.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const getMethodColor = (method: string) => {
  const map: Record<string, string> = {
    GET: 'text-method-get-text',
    POST: 'text-method-post-text',
    PUT: 'text-method-put-text',
    DELETE: 'text-method-delete-text',
    PATCH: 'text-method-patch-text',
  }
  return map[method] || map.GET
}
