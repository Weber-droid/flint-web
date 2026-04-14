import { useEffect, useState } from 'react'
import { Command } from 'lucide-react'

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-xl rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Command className="text-secondary mr-3" size={18} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-primary placeholder-secondary outline-none text-base"
          />
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          <div className="text-xs font-semibold text-secondary px-3 mb-2 mt-2 uppercase tracking-wider">Suggestions</div>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-border text-sm flex justify-between items-center text-primary group transition-colors">
            <span>New Request</span>
            <span className="text-secondary text-xs opacity-0 group-hover:opacity-100">Ctrl+N</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-border text-sm flex justify-between items-center text-primary group transition-colors">
            <span>Toggle AI Drawer</span>
            <span className="text-secondary text-xs opacity-0 group-hover:opacity-100">Ctrl+E</span>
          </button>
        </div>
      </div>
    </div>
  )
}
