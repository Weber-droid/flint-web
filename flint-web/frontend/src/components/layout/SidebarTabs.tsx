import { Folder, Clock, Globe } from 'lucide-react'

interface SidebarProps {
  activeTab: 'collections' | 'history' | 'environments'
  onTabChange: (tab: 'collections' | 'history' | 'environments') => void
}

export function SidebarTabs({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="flex items-center border-b border-border bg-surface h-10 px-2">
      <button 
        onClick={() => onTabChange('collections')}
        className={`flex-1 flex justify-center py-1.5 rounded transition-colors ${activeTab === 'collections' ? 'bg-background text-primary' : 'text-secondary hover:text-primary hover:bg-border'}`}
        title="Collections"
      >
        <Folder size={16} />
      </button>
      <button 
        onClick={() => onTabChange('history')}
        className={`flex-1 flex justify-center py-1.5 rounded transition-colors ${activeTab === 'history' ? 'bg-background text-primary' : 'text-secondary hover:text-primary hover:bg-border'}`}
        title="History"
      >
        <Clock size={16} />
      </button>
      <button 
        onClick={() => onTabChange('environments')}
        className={`flex-1 flex justify-center py-1.5 rounded transition-colors ${activeTab === 'environments' ? 'bg-background text-primary' : 'text-secondary hover:text-primary hover:bg-border'}`}
        title="Environments"
      >
        <Globe size={16} />
      </button>
    </div>
  )
}
