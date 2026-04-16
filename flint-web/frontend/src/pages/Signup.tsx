import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Github, Zap, Shield, GitBranch, Activity } from 'lucide-react'
import { FlintLogo } from '../components/common/FlintLogo'
import { supabase } from '../lib/supabase'

const features = [
  { icon: <Zap size={16} />, text: 'AI explains every response in plain English' },
  { icon: <GitBranch size={16} />, text: 'Auto-detects routes straight from your code' },
  { icon: <Shield size={16} />, text: 'Local-first — your requests never leave your machine' },
  { icon: <Activity size={16} />, text: 'WebSocket & SSE testing with live AI analysis' },
]

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-lime-500', 'bg-emerald-500']

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setIsLoading(true)
    setError('')
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })
    if (signUpError) {
      setError(signUpError.message)
      setIsLoading(false)
    } else {
      navigate('/')
      alert('Welcome to Flint!')
    }
  }

  const handleGithub = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' })
  }

  const passwordStrength = (pw: string) => {
    let score = 0
    if (pw.length > 0) score++
    if (pw.length > 7) score++
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
  }

  const strength = passwordStrength(password)

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
              Build smarter.<br />Debug faster.<br />Ship with confidence.
            </h2>
            <p className="text-violet-200 text-lg leading-relaxed">
              Join developers worldwide who've made Flint their go-to API client.
            </p>
          </div>

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
            <h1 className="text-[1.75rem] font-bold text-gray-900 tracking-tight mb-2">Create your account</h1>
            <p className="text-gray-500 text-sm">Free forever. No credit card required.</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Email address</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white"
                required
              />
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{strengthLabel[strength]}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="••••••••"
                className={`w-full h-11 bg-gray-50 border rounded-lg px-3.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:bg-white ${
                  confirm && confirm !== password ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-violet-500'
                }`}
                required
              />
              {confirm && confirm !== password && (
                <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-50 hover:brightness-110 active:scale-[0.98] mt-1"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              {isLoading ? 'Creating account…' : 'Create account'}
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

          <button
            onClick={handleGithub}
            className="w-full h-11 flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Github size={17} />
            Sign up with GitHub
          </button>

          <p className="mt-5 text-center text-xs text-gray-400 leading-relaxed">
            By creating an account you agree to our{' '}
            <a href="#" className="underline hover:text-gray-600">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
          </p>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 font-semibold hover:text-violet-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
