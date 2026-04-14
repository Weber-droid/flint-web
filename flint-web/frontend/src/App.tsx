import { useEffect } from 'react'
import { AppShell } from './components/layout/AppShell'
import { useCollectionStore } from './store/collectionStore'

function App() {
  const { loadCollections } = useCollectionStore()

  useEffect(() => {
    loadCollections()
  }, [loadCollections])

  return (
    <AppShell />
  )
}

export default App
