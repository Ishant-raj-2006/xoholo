'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, Zap, Twitter } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name || !email || !password) {
      setMessage('Please complete all fields before continuing.')
      return
    }
    setMessage('Account created — redirecting to login...')
    setTimeout(() => router.push('/login'), 600)
  }

  return (
    <div className="min-h-screen bg-[#0f1117] p-4 text-slate-100 sm:p-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="absolute left-8 top-10 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute right-8 bottom-10 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-xl space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Create account</p>
            <h1 className="text-4xl font-semibold text-white">Get started with Xholo</h1>
            <p className="text-sm text-slate-400">Create your secure account and centralize every subscription in one futuristic dashboard.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-slate-300">
              Full name
              <div className="mt-2 flex items-center rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <User className="mr-3 h-5 w-5 text-slate-400" />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="First Last"
                  required
                />
              </div>
            </label>
            <label className="block text-sm text-slate-300">
              Email
              <div className="mt-2 flex items-center rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <Mail className="mr-3 h-5 w-5 text-slate-400" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>
            </label>
            <label className="block text-sm text-slate-300">
              Password
              <div className="mt-2 flex items-center rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <Lock className="mr-3 h-5 w-5 text-slate-400" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-transparent text-white outline-none"
                  placeholder="Create password"
                  required
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-400 transition hover:text-white">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </label>
            <button type="submit" className="w-full rounded-3xl bg-brand-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-300">
              Create account
            </button>
          </form>
          {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300 shadow-soft">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-brand-300" />
              <span>Secure onboarding with optional biometric unlock and immediate dashboard access.</span>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300 shadow-soft">
            <p className="text-sm font-semibold text-white">Mobile access</p>
            <p className="mt-3 text-sm leading-6">Download the Xholo mobile app and sign in with your account anytime.</p>
            <a href="/xholo-mobile-app.apk" download className="mt-4 inline-flex rounded-3xl bg-brand-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-300">
              Download app
            </a>
          </div>
          <div className="text-sm text-slate-400">
            <Link href="/login" className="transition hover:text-white">
              Already have an account? Sign in
            </Link>
          </div>
          <div className="relative py-4 text-center text-xs uppercase tracking-[0.35em] text-slate-500">
            <span className="relative bg-slate-950 px-4">or build your account using</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Zap, label: 'Quickstart' },
              { icon: Zap, label: 'Google' },
              { icon: Twitter, label: 'Twitter' }
            ].map((provider) => {
              const Icon = provider.icon
              return (
                <button key={provider.label} className="flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10">
                  <Icon className="h-4 w-4" />
                  {provider.label}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
