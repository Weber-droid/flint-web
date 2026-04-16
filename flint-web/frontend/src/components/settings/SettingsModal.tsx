import { useState, useEffect } from 'react'
import { X, User, Monitor, Key, Network, Keyboard } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { user, plan, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState('account')
  const [aiProvider, setAiProvider] = useState('openai')
  const [apiKey, setApiKey] = useState('')
  const [proxyEnabled, setProxyEnabled] = useState(true)
  const [proxyPort, setProxyPort] = useState('3001')
  const [fontSize, setFontSize] = useState('13')

  useEffect(() => {
    // Load from local storage
    const savedProvider = localStorage.getItem('flint_ai_provider')
    const savedKey = localStorage.getItem('flint_ai_key')
    if (savedProvider) setAiProvider(savedProvider)
    if (savedKey) setApiKey(savedKey)
  }, [isOpen])

  const saveAiSettings = () => {
    localStorage.setItem('flint_ai_provider', aiProvider)
    localStorage.setItem('flint_ai_key', apiKey)
    alert('AI settings saved')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-3xl rounded-xl border border-border shadow-2xl flex overflow-hidden h-[600px]">
        {/* Sidebar */}
        <div className="w-48 bg-background border-r border-border p-4 flex flex-col space-y-2">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 px-2">Settings</div>
          <button onClick={() => setActiveTab('account')} className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm transition-colors ${activeTab === 'account' ? 'bg-surface text-primary' : 'text-secondary hover:text-primary hover:bg-surface/50'}`}>
            <User size={16} /><span>Account</span>
          </button>
          <button onClick={() => setActiveTab('ai')} className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm transition-colors ${activeTab === 'ai' ? 'bg-surface text-primary' : 'text-secondary hover:text-primary hover:bg-surface/50'}`}>
            <Key size={16} /><span>AI Provider</span>
          </button>
          <button onClick={() => setActiveTab('appearance')} className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm transition-colors ${activeTab === 'appearance' ? 'bg-surface text-primary' : 'text-secondary hover:text-primary hover:bg-surface/50'}`}>
            <Monitor size={16} /><span>Appearance</span>
          </button>
          <button onClick={() => setActiveTab('proxy')} className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm transition-colors ${activeTab === 'proxy' ? 'bg-surface text-primary' : 'text-secondary hover:text-primary hover:bg-surface/50'}`}>
            <Network size={16} /><span>Proxy</span>
          </button>
          <button onClick={() => setActiveTab('shortcuts')} className={`flex items-center space-x-2 px-2 py-2 rounded-md text-sm transition-colors ${activeTab === 'shortcuts' ? 'bg-surface text-primary' : 'text-secondary hover:text-primary hover:bg-surface/50'}`}>
            <Keyboard size={16} /><span>Shortcuts</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col bg-surface relative">
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="p-1 text-secondary hover:text-primary rounded-md transition-colors"><X size={20} /></button>
          </div>
          
          <div className="p-8 flex-1 overflow-y-auto">
            {activeTab === 'account' && (
              <div className="space-y-6 max-w-md">
                <div>
                  <h2 className="text-xl font-bold mb-4">Account</h2>
                  {user ? (
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm font-medium">{user.email}</div>
                          <div className="text-xs text-secondary mt-1">Plan: <span className="text-accent uppercase tracking-wider font-bold">{plan}</span></div>
                        </div>
                        <button onClick={() => { logout(); onClose(); }} className="px-3 py-1.5 bg-method-delete-bg text-method-delete-text rounded text-sm hover:brightness-110 transition-all">Sign Out</button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-secondary">You are not signed in. <a href="/login" className="text-accent hover:underline">Sign in</a></div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6 max-w-md">
                <h2 className="text-xl font-bold mb-4">AI Provider</h2>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                    <input type="radio" name="provider" value="openai" checked={aiProvider === 'openai'} onChange={e => setAiProvider(e.target.value)} className="accent-accent" />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#74aa9c" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9066 6.0462 6.0462 0 0 0-3.9471-3.1276 6.0417 6.0417 0 0 0-5.0023.5153 5.9847 5.9847 0 0 0-4.9066.5153 6.0462 6.0462 0 0 0-3.1276 3.9471 6.0417 6.0417 0 0 0 .5153 5.0023 5.9847 5.9847 0 0 0 .5153 4.9066 6.0462 6.0462 0 0 0 3.9471 3.1276 6.0417 6.0417 0 0 0 5.0023-.5153 5.9847 5.9847 0 0 0 4.9066-.5153 6.0462 6.0462 0 0 0 3.1276-3.9471 6.0417 6.0417 0 0 0-.5153-5.0023zm-7.3155 10.1438l-4.5308-2.6157v-5.2314l4.5308 2.6157v5.2314zm-1.1906-13.2505l-4.5308 2.6157-4.5308-2.6157 4.5308-2.6157 4.5308 2.6157zm-8.9206 5.1071l4.5308 2.6157v5.2314l-4.5308-2.6157v-5.2314zm1.1906-1.3259l4.5308-2.6157 4.5308 2.6157-4.5308 2.6157-4.5308-2.6157zm8.9206-5.1071l-4.5308-2.6157v-5.2314l4.5308 2.6157v5.2314zm-1.1906 1.3259l-4.5308 2.6157-4.5308-2.6157 4.5308-2.6157 4.5308 2.6157z"/></svg>
                    <span class="text-sm">OpenAI</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                    <input type="radio" name="provider" value="anthropic" checked={aiProvider === 'anthropic'} onChange={e => setAiProvider(e.target.value)} className="accent-accent" />
                    <img src="https://cdn.simpleicons.org/anthropic/f5f5f5" width="16" />
                    <span class="text-sm">Anthropic</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                    <input type="radio" name="provider" value="gemini" checked={aiProvider === 'gemini'} onChange={e => setAiProvider(e.target.value)} className="accent-accent" />
                    <img src="https://cdn.simpleicons.org/googlegemini/f5f5f5" width="16" />
                    <span class="text-sm">Gemini</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                    <input type="radio" name="provider" value="mistral" checked={aiProvider === 'mistral'} onChange={e => setAiProvider(e.target.value)} className="accent-accent" />
                    <img src="https://cdn.simpleicons.org/mistralai/f5f5f5" width="16" />
                    <span class="text-sm">Mistral</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                    <input type="radio" name="provider" value="groq" checked={aiProvider === 'groq'} onChange={e => setAiProvider(e.target.value)} className="accent-accent" />
                    <img src="https://cdn.simpleicons.org/groq/f5f5f5" width="16" />
                    <span class="text-sm">Groq (Llama)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                    <input type="radio" name="provider" value="perplexity" checked={aiProvider === 'perplexity'} onChange={e => setAiProvider(e.target.value)} className="accent-accent" />
                    <img src="https://cdn.simpleicons.org/perplexity/f5f5f5" width="16" />
                    <span class="text-sm">Perplexity</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus-ring"
                  />
                </div>
                <button onClick={saveAiSettings} className="bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent/90 transition-all text-sm">Save Settings</button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6 max-w-md">
                <h2 className="text-xl font-bold mb-4">Appearance</h2>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Theme</label>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-background border-2 border-accent rounded-md text-sm">Light</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Editor Font Size</label>
                  <div className="flex items-center space-x-4">
                    <input type="range" min="10" max="24" value={fontSize} onChange={e => setFontSize(e.target.value)} className="accent-accent flex-1" />
                    <span className="text-sm font-mono">{fontSize}px</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'proxy' && (
              <div className="space-y-6 max-w-md">
                <h2 className="text-xl font-bold mb-4">Proxy</h2>
                <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Enable Backend Proxy</div>
                    <div className="text-xs text-secondary mt-1">Routes requests through Bun to avoid CORS</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={proxyEnabled} onChange={e => setProxyEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Proxy Port</label>
                  <input
                    type="text"
                    value={proxyPort}
                    onChange={e => setProxyPort(e.target.value)}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus-ring"
                  />
                </div>
              </div>
            )}

            {activeTab === 'shortcuts' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Keyboard Shortcuts</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Send Request', keys: ['Ctrl', 'Enter'] },
                    { label: 'Command Palette', keys: ['Ctrl', 'K'] },
                    { label: 'Toggle AI Drawer', keys: ['Ctrl', 'E'] },
                    { label: 'Toggle History', keys: ['Ctrl', 'H'] },
                    { label: 'New Request', keys: ['Ctrl', 'N'] },
                    { label: 'Save Request', keys: ['Ctrl', 'S'] },
                    { label: 'Close Tab', keys: ['Ctrl', 'W'] },
                    { label: 'Next Tab', keys: ['Ctrl', 'Tab'] },
                  ].map((shortcut, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-secondary">{shortcut.label}</span>
                      <div className="flex space-x-1">
                        {shortcut.keys.map((k, j) => (
                          <span key={j} className="px-2 py-1 bg-background border border-border rounded text-xs font-mono">{k}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
