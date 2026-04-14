import React from 'react'
import { UrlBar } from './UrlBar'
import { KeyValueEditor } from '../common/KeyValueEditor'
import { ResponseViewer } from '../response/ResponseViewer'
import { useRequestStore } from '../../store/requestStore'
import { MonacoEditor } from '../common/MonacoEditor'

export function RequestPanel() {
  const { activeRequest, updateActiveRequest } = useRequestStore()
  const [activeTab, setActiveTab] = React.useState('Params')

  if (!activeRequest) return null

  const tabs = ['Params', 'Headers', 'Body', 'Auth', 'Pre-request Script', 'Tests']

  return (
    <div className="flex flex-col h-full w-full">
      <UrlBar />
      
      <div className="flex items-center px-4 border-b border-border bg-background overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'border-accent text-primary bg-surface' 
                : 'border-transparent text-secondary hover:text-primary hover:border-border'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-[300px] overflow-y-auto bg-background">
        {activeTab === 'Params' && (
          <KeyValueEditor 
            items={activeRequest.params} 
            onChange={params => updateActiveRequest({ params })} 
          />
        )}
        {activeTab === 'Headers' && (
          <KeyValueEditor 
            items={activeRequest.headers} 
            onChange={headers => updateActiveRequest({ headers })} 
          />
        )}
        {activeTab === 'Body' && (
          <div className="h-full">
            <MonacoEditor 
              value={activeRequest.body} 
              onChange={body => updateActiveRequest({ body })} 
              language="json" 
            />
          </div>
        )}
      </div>

      <div className="h-[40vh] min-h-[200px] border-t border-border resize-y overflow-hidden">
        <ResponseViewer />
      </div>
    </div>
  )
}
