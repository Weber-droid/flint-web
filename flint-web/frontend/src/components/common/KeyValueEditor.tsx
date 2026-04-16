import { KeyValue } from '../../types/request'
import { Trash2, Plus } from 'lucide-react'

interface Props {
  items: KeyValue[]
  onChange: (items: KeyValue[]) => void
}

export function KeyValueEditor({ items, onChange }: Props) {
  const handleUpdate = (id: string, field: keyof KeyValue, value: any) => {
    onChange(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const handleRemove = (id: string) => {
    onChange(items.filter(i => i.id !== id))
  }

  const handleAdd = () => {
    onChange([...items, { id: crypto.randomUUID(), key: '', value: '', enabled: true }])
  }

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="grid grid-cols-[40px_1fr_1fr_40px] gap-2 p-2 border-b border-border text-secondary font-medium">
        <div className="flex items-center justify-center"></div>
        <div>Key</div>
        <div>Value</div>
        <div></div>
      </div>
      
      {items.map((item, i) => (
        <div key={item.id} className="grid grid-cols-[40px_1fr_1fr_40px] gap-2 p-1 border-b border-border/50 hover:bg-surface transition-colors group">
          <div className="flex items-center justify-center">
            <input 
              type="checkbox" 
              checked={item.enabled}
              onChange={e => handleUpdate(item.id, 'enabled', e.target.checked)}
              className="accent-accent"
            />
          </div>
          <input
            value={item.key}
            onChange={e => handleUpdate(item.id, 'key', e.target.value)}
            placeholder="Key"
            className="bg-transparent border border-transparent hover:border-border focus:border-accent outline-none px-2 py-1 rounded font-mono"
            onKeyDown={e => {
              if (e.key === 'Tab' && !e.shiftKey && i === items.length - 1 && item.key) {
                 // handle Add on tab in value field ideally
              }
            }}
          />
          <input
            value={item.value}
            onChange={e => handleUpdate(item.id, 'value', e.target.value)}
            placeholder="Value"
            className="bg-transparent border border-transparent hover:border-border focus:border-accent outline-none px-2 py-1 rounded font-mono"
            onKeyDown={e => {
              if (e.key === 'Tab' && !e.shiftKey && i === items.length - 1) {
                e.preventDefault()
                handleAdd()
              }
            }}
          />
          <button 
            onClick={() => handleRemove(item.id)}
            className="flex items-center justify-center text-secondary hover:text-method-delete-text opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <div className="p-2">
        <button onClick={handleAdd} className="flex items-center space-x-1 text-secondary hover:text-primary transition-colors">
          <Plus size={16} />
          <span>Add row</span>
        </button>
      </div>
    </div>
  )
}
