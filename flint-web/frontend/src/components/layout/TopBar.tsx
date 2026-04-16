import { useEnvironmentStore } from '../../store/environmentStore'
import { useAuthStore } from '../../store/authStore'
import { useAIStore } from '../../store/aiStore'
import { Settings, Activity, User, ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { SettingsModal } from '../settings/SettingsModal'
import { FlintLogo } from '../common/FlintLogo'

export function TopBar() {
  const { environments, activeEnvironmentId, setActive } = useEnvironmentStore()
  const { user, logout } = useAuthStore()
  const { toggleDrawer } = useAIStore()
  const [showEnv, setShowEnv] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const activeEnv = environments.find(e => e.id === activeEnvironmentId)

  return (
    <>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <div className="h-12 border-b border-border bg-surface flex items-center justify-between px-4 flex-shrink-0 transition-colors">
        <div className="flex items-center space-x-6">
          <FlintLogo size={22} />
          
          <div className="relative">
            <button 
              onClick={() => setShowEnv(!showEnv)}
              className="flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors px-2 py-1 rounded hover:bg-border"
            >
              <span>{activeEnv ? activeEnv.name : 'No Environment'}</span>
              <ChevronDown size={14} />
            </button>
            
            {showEnv && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-md shadow-lg z-50 py-1">
                {environments.map(env => (
                  <button
                    key={env.id}
                    onClick={() => { setActive(env.id); setShowEnv(false) }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center space-x-2 hover:bg-border transition-colors ${env.id === activeEnvironmentId ? 'text-accent' : 'text-primary'}`}
                  >
                    {env.name}
                  </button>
                ))}
                <div className="h-px bg-border my-1"></div>
                <button className="w-full text-left px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-border transition-colors">
                  Manage Environments
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-secondary hover:text-primary rounded-md hover:bg-border transition-colors" title="WebSocket Mode">
            <Activity size={18} />
          </button>
          <button 
            onClick={toggleDrawer}
            className="p-2 text-secondary hover:text-accent rounded-md hover:bg-border transition-colors" 
            title="Toggle AI Drawer (Ctrl+E)"
          >
            <Sparkles size={18} />
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-secondary hover:text-primary rounded-md hover:bg-border transition-colors" 
            title="Settings"
          >
            <Settings size={18} />
          </button>

          <div className="h-4 w-px bg-border mx-2"></div>

          <div className="relative">
            <button 
              onClick={() => setShowUser(!showUser)}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-white text-sm font-medium hover:brightness-110 transition-all focus-ring"
            >
              {user?.email?.charAt(0).toUpperCase() || <User size={16} />}
            </button>
            
            {showUser && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-surface border border-border rounded-md shadow-lg z-50 py-1">
                <div className="px-4 py-2 border-b border-border">
                  <div className="text-sm font-medium truncate">{user?.email || 'Guest'}</div>
                  <div className="text-xs text-accent mt-0.5 uppercase tracking-wider">{user ? 'Pro Plan' : 'Free Plan'}</div>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-border transition-colors">Profile</button>
                <button onClick={() => setIsSettingsOpen(true)} className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-border transition-colors">Settings</button>
                <button 
                  onClick={() => { logout(); setShowUser(false) }}
                  className="w-full text-left px-4 py-2 text-sm text-method-delete-text hover:bg-border transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
