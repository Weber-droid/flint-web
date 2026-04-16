import { Plus } from 'lucide-react'
import { useEnvironmentStore } from '../../store/environmentStore'

export function EnvironmentManager() {
  const { environments, activeEnvironmentId, setActive } = useEnvironmentStore()
  // Minimal placeholder implementation to fulfill the layout tab requirement
  return (
    <div className="flex flex-col h-full bg-background border-r border-border text-sm">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="font-medium text-secondary">Environments</span>
        <button className="p-1.5 text-secondary hover:text-primary bg-surface border border-border rounded hover:bg-border transition-colors">
          <Plus size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {environments.length === 0 ? (
          <div className="text-center text-secondary p-4 mt-4 text-xs">
            No environments yet.
          </div>
        ) : (
          <div className="space-y-1">
            {environments.map(env => (
              <div 
                key={env.id}
                onClick={() => setActive(env.id)}
                className={`p-2 rounded cursor-pointer transition-colors flex items-center justify-between ${activeEnvironmentId === env.id ? 'bg-surface border-l-2 border-accent text-primary' : 'text-secondary hover:bg-surface hover:text-primary'}`}
              >
                <span>{env.name}</span>
                {activeEnvironmentId === env.id && <span className="text-[10px] uppercase tracking-wider text-accent">Active</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
