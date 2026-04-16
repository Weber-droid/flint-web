import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { FlintLogo } from '../components/common/FlintLogo'
import { supabase } from '../lib/supabase'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)
    if (resetError) {
      setError(resetError.message)
    } else {
      setSuccess(true)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">

      {/* Left panel — matches Login/Signup */}
      <div className="hidden lg:flex w-[52%] flex-col justify-center items-center p-12 relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 40%, #6d28d9 70%, #4c1d95 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
               style={{ animation: 'floatY 9s ease-in-out infinite' }} />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-violet-300/20 blur-3xl"
               style={{ animation: 'floatY 11s ease-in-out infinite reverse' }} />
          <div className="absolute inset-0 opacity-[0.07]"
               style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <FlintLogo size={28} color="#ffffff" />
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">We've got you covered.</h2>
          <p className="text-violet-200 text-lg max-w-sm mx-auto">
            Password resets are instant. You'll be back to shipping APIs in no time.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-[380px]" style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}>

          <div className="lg:hidden mb-10">
            <FlintLogo size={24} />
          </div>

          {!success ? (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                     style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' }}>
                  <Mail size={22} className="text-violet-600" />
                </div>
                <h1 className="text-[1.75rem] font-bold text-gray-900 tracking-tight mb-2">Reset your password</h1>
                <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset link right away.</p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-lg font-semibold text-sm text-white transition-all disabled:opacity-50 hover:brightness-110 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                >
                  {isLoading ? 'Sending…' : 'Send reset link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                   style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                <Mail size={28} className="text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your inbox</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                We sent a password reset link to <span className="font-semibold text-gray-700">{email}</span>.<br />
                It expires in 24 hours.
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 transition-colors font-medium">
              <ArrowLeft size={15} />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
