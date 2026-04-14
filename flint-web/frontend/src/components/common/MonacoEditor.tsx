import React from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import { Copy } from 'lucide-react'

interface Props {
  value: string
  onChange?: (value: string) => void
  language?: string
  readOnly?: boolean
}

export function MonacoEditor({ value, onChange, language = 'json', readOnly = false }: Props) {
  const monaco = useMonaco()

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('flint-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#0d0d0d',
          'editor.lineHighlightBackground': '#161616',
        }
      })
      monaco.editor.setTheme('flint-dark')
    }
  }, [monaco])

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="relative w-full h-full group">
      <Editor
        height="100%"
        language={language}
        theme="flint-dark"
        value={value}
        onChange={(val) => onChange && onChange(val || '')}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: '"JetBrains Mono", monospace',
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          formatOnPaste: true,
        }}
      />
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-4 p-2 bg-surface border border-border rounded text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-all"
        title="Copy to clipboard"
      >
        <Copy size={16} />
      </button>
    </div>
  )
}
