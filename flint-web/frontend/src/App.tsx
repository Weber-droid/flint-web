import { useEffect } from 'react'
import { AppShell } from './components/layout/AppShell'
import { useCollectionStore } from './store/collectionStore'
import { useEnvironmentStore } from './store/environmentStore'
import { useHistoryStore } from './store/historyStore'
import { useAuthStore } from './store/authStore'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ForgotPassword } from './pages/ForgotPassword'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import License from './pages/License'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()
  if (isLoading) return <div className="h-screen flex items-center justify-center bg-background text-secondary">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()
  if (isLoading) return <div className="h-screen flex items-center justify-center bg-background text-secondary">Loading...</div>
  if (user) return <Navigate to="/" replace />
  return <>{children}</>
}

function App() {
  const { loadCollections } = useCollectionStore()
  const { loadEnvironments } = useEnvironmentStore()
  const { loadHistory } = useHistoryStore()
  const { checkSession } = useAuthStore()
  useEffect(() => {
    localStorage.removeItem('flint-theme')
    document.documentElement.classList.remove('dark')
  }, [])

  useEffect(() => {
    checkSession()
    loadCollections()
    loadEnvironments()
    loadHistory()
  }, [checkSession, loadCollections, loadEnvironments, loadHistory])

  return (
    <Routes>
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
      <Route path="/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/license" element={<License />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
