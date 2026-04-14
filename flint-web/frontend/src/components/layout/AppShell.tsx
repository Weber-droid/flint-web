import React from 'react'
import { RequestPanel } from '../request/RequestPanel'
import { CollectionTree } from '../collections/CollectionTree'
import { AIDrawer } from '../ai/AIDrawer'
import { CommandPalette } from '../common/CommandPalette'

export function AppShell() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-primary">
      <CommandPalette />
      
      {/* Left Sidebar */}
      <div className="w-[240px] flex-shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="h-10 border-b border-border flex items-center px-4 text-sm font-semibold tracking-wider text-secondary uppercase">
          Collections
        </div>
        <div className="flex-1 overflow-hidden">
          <CollectionTree />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative">
        <div className="flex-1 overflow-hidden flex flex-col">
          <RequestPanel />
        </div>
      </div>

      {/* Right Drawer */}
      <AIDrawer />
    </div>
  )
}
