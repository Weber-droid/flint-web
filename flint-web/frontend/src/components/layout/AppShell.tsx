import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RequestPanel } from '../request/RequestPanel'
import { CollectionTree } from '../collections/CollectionTree'
import { HistoryPanel } from '../history/HistoryPanel'
import { EnvironmentManager } from '../environment/EnvironmentManager'
import { AIDrawer } from '../ai/AIDrawer'
import { CommandPalette } from '../common/CommandPalette'
import { TopBar } from './TopBar'
import { SidebarTabs } from './SidebarTabs'

export function AppShell() {
  const [activeSidebarTab, setActiveSidebarTab] = useState<'collections' | 'history' | 'environments'>('collections')

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden text-primary">
      <CommandPalette />
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[240px] flex-shrink-0 border-r border-border bg-surface flex flex-col">
          <SidebarTabs activeTab={activeSidebarTab} onTabChange={setActiveSidebarTab} />
          <div className="flex-1 overflow-hidden">
            {activeSidebarTab === 'collections' && <CollectionTree />}
            {activeSidebarTab === 'history' && <HistoryPanel />}
            {activeSidebarTab === 'environments' && <EnvironmentManager />}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-border flex items-center justify-between text-[10px] text-secondary font-medium uppercase tracking-wider">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/license" className="hover:text-primary transition-colors">License</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-background relative">
          <div className="flex-1 overflow-hidden flex flex-col">
            <RequestPanel />
          </div>
        </div>
      </div>

      {/* Right Drawer */}
      <AIDrawer />
    </div>
  )
}
