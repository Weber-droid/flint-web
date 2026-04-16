import { useState } from 'react'
import { MonacoEditor } from '../common/MonacoEditor'
import { useRequestStore } from '../../store/requestStore'

export function ResponseViewer() {
  const { lastResponse } = useRequestStore()
  const [activeTab, setActiveTab] = useState('Body')

  if (!lastResponse) {
    return (
      <div className="flex flex-col h-full bg-background border-t border-border">
        <div className="flex-1 flex items-center justify-center text-secondary text-sm">
          Send a request to see the response
        </div>
      </div>
    )
  }

  const isJson = lastResponse.headers['content-type']?.includes('application/json')
  let displayBody = lastResponse.body as string
  
  if (isJson && typeof displayBody === 'string') {
    try {
      displayBody = JSON.stringify(JSON.parse(displayBody), null, 2)
    } catch (e) {}
  }

  const tabs = ['Body', 'Headers', 'Test Results']

  return (
    <div className="flex flex-col h-full bg-background relative border-t border-border">
      <div className="flex items-center px-4 border-b border-border bg-background overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'border-accent text-primary bg-surface' 
                : 'border-transparent text-secondary hover:text-primary hover:border-border'
            }`}
          >
            {tab} {tab === 'Headers' && `(${Object.keys(lastResponse.headers).length})`}
          </button>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        {activeTab === 'Body' && (
          <MonacoEditor 
            value={displayBody} 
            language={isJson ? 'json' : 'html'} 
            readOnly 
          />
        )}
        {activeTab === 'Headers' && (
          <div className="flex-1 overflow-y-auto p-4 text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-secondary">
                  <th className="pb-2 font-medium">Key</th>
                  <th className="pb-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {Object.entries(lastResponse.headers).map(([key, value]) => (
                  <tr key={key} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-2 pr-4 align-top text-primary">{key}</td>
                    <td className="py-2 align-top text-secondary break-all">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'Test Results' && (
          <div className="flex-1 flex items-center justify-center text-secondary text-sm">
            No tests written for this request
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 p-2 border-t border-border bg-surface text-xs font-mono">
        <span className={`font-bold ${lastResponse.status >= 200 && lastResponse.status < 300 ? 'text-method-get-text' : lastResponse.status >= 400 ? 'text-method-delete-text' : 'text-method-post-text'}`}>
          {lastResponse.status} {lastResponse.statusText}
        </span>
        <span className="text-secondary">{lastResponse.metrics.durationMs} ms</span>
        <span className="text-secondary">{(lastResponse.metrics.sizeBytes / 1024).toFixed(2)} KB</span>
      </div>
    </div>
  )
}
