import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Github, Eye, EyeOff, Zap, Shield, GitBranch, Activity } from 'lucide-react'
import { FlintLogo } from '../components/common/FlintLogo'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

const features = [
  { icon: <Zap size={16} />, text: 'AI explains every response in plain English' },
  { icon: <GitBranch size={16} />, text: 'Auto-detects routes straight from your code' },
  { icon: <Shield size={16} />, text: 'Local-first — your requests never leave your machine' },
  { icon: <Activity size={16} />, text: 'WebSocket & SSE testing with live AI analysis' },
]

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { checkSession, devLogin } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      setIsLoading(false)
    } else {
      await checkSession()
      navigate('/')
    }
  }

  const handleGithub = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' })
  }

  const handleDevLogin = () => {
    devLogin()
    navigate('/')
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex w-[52%] flex-col justify-between p-12 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 40%, #6d28d9 70%, #4c1d95 100%)' }}>

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
               style={{ animation: 'floatY 9s ease-in-out infinite' }} />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-violet-300/20 blur-3xl"
               style={{ animation: 'floatY 11s ease-in-out infinite reverse' }} />
          <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-white/5 blur-2xl"
               style={{ animation: 'floatY 7s ease-in-out infinite 2s' }} />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.07]"
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <FlintLogo size={26} color="#ffffff" />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-8">
          <div style={{ animation: 'fadeInLeft 0.6s ease-out forwards' }}>
            <h2 className="text-[2.6rem] font-bold text-white leading-[1.15] tracking-tight mb-4">
              Test APIs.<br />Understand them.<br />Ship faster.
            </h2>
            <p className="text-violet-200 text-lg leading-relaxed">
              The AI-native API client built for developers who move fast.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 opacity-0"
                style={{ animation: `fadeInLeft 0.5s ease-out ${300 + i * 120}ms forwards` }}
              >
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 text-white">
                  {f.icon}
                </div>
                <span className="text-white/90 text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="relative z-10 flex items-center gap-4"
             style={{ animation: 'fadeInLeft 0.6s ease-out 800ms forwards', opacity: 0 }}>
          <div className="flex -space-x-2.5">
            {['#a78bfa','#8b5cf6','#7c3aed','#6d28d9'].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center text-white text-xs font-bold"
                   style={{ background: c }}>
                {String.fromCharCode(65 + i * 3)}
              </div>
            ))}
          </div>
          <p className="text-violet-200 text-sm">
            Trusted by <span className="text-white font-semibold">10,000+</span> developers
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 overflow-y-auto bg-white">
        <div className="w-full max-w-[380px]" style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <FlintLogo size={24} />
          </div>

          <div className="mb-8">
            <h1 className="text-[1.75rem] font-bold text-gray-900 tracking-tight mb-2">Welcome back</h1>
            <p className="text-gray-500 text-sm">Sign in to sync your collections and continue building.</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-gray-700" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-xs text-violet-600 hover:text-violet-700 font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-50 hover:brightness-110 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={handleGithub}
              className="w-full h-11 flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <Github size={17} />
              Continue with GitHub
            </button>
            <button
              onClick={handleDevLogin}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all italic"
            >
              Dev: Skip Login (bypass Supabase)
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-violet-600 font-semibold hover:text-violet-700">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
