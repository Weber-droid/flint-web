import { Folder, ChevronRight } from 'lucide-react'
import { useCollectionStore } from '../../store/collectionStore'

export function CollectionTree() {
  const { collections, requests } = useCollectionStore()

  return (
    <div className="flex flex-col h-full bg-background border-r border-border text-sm">
      <div className="p-3 border-b border-border">
        <input 
          type="text" 
          placeholder="Filter collections..." 
          className="w-full bg-surface border border-border rounded px-3 py-1.5 text-primary placeholder-secondary focus-ring"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {collections.length === 0 && requests.length === 0 ? (
          <div className="text-center text-secondary p-4 mt-4 text-xs">
            No collections yet. Create one to get started.
          </div>
        ) : (
          <div className="space-y-1">
            {collections.map(col => (
              <div key={col.id} className="group">
                <button className="w-full flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-surface text-secondary hover:text-primary transition-colors">
                  <ChevronRight size={14} className="opacity-50" />
                  <Folder size={14} className="text-accent" />
                  <span className="truncate">{col.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
