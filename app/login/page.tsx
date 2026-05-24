'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Facebook, Twitter, Zap } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email || !password) {
      setMessage('Please enter your email and password.')
      return
    }
    setMessage('Login successful — redirecting...')
    setTimeout(() => router.push('/'), 500)
  }

  return (
    <div className="min-h-screen bg-[#0f1117] p-4 text-slate-100 sm:p-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="grid w-full gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-glow">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Welcome back</p>
              <h1 className="text-4xl font-semibold text-white">Sign in to Xholo</h1>
              <p className="text-sm text-slate-400">Access your premium subscription cockpit with secure sign-in experience.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-400 transition hover:text-white">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>
              <button type="submit" className="w-full rounded-3xl bg-brand-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-300">
                Sign in
              </button>
            </form>
            {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
            <div className="text-sm text-slate-400">
              <Link href="/signup" className="transition hover:text-white">
                Don't have an account? Create one
              </Link>
            </div>
            <div className="relative py-4 text-center text-xs uppercase tracking-[0.35em] text-slate-500">
              <span className="relative bg-slate-950 px-4">Or continue with</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Zap, label: 'Google' }
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
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow lg:block">
            <div className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Why Xholo?</p>
                <h2 className="text-3xl font-semibold text-white">A smarter subscription center.</h2>
              </div>
              <p className="text-sm leading-7 text-slate-400">Sign in now to unlock intelligent renewal reminders, spending clarity, and proactive subscription control.</p>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Focus on savings</p>
                <p className="mt-3 text-sm text-slate-200">Find unused plans, optimize billing, and stop surprise charges before they happen.</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Stay in control</p>
                <p className="mt-3 text-sm text-slate-200">Manage renewals, pause subscriptions, and get notified when a payment is coming.</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Enjoy clarity</p>
                <p className="mt-3 text-sm text-slate-200">View all recurring plans in one place with category insights and currency-smart totals.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 rounded-[2rem] border border-brand-300/10 bg-brand-400/5 p-6 text-sm text-slate-300 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Ready for less chaos?</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">Your subscriptions, organized and under control.</h3>
                </div>
                <div className="rounded-3xl bg-brand-300/15 px-3 py-2 text-xs uppercase tracking-[0.35em] text-brand-100">Fast setup</div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 rounded-3xl bg-slate-950/70 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-300/10 text-brand-300">01</span>
                  <p className="text-sm text-slate-200">Instantly see what renews next and how much you'll pay.</p>
                </div>
                <div className="flex items-center gap-3 rounded-3xl bg-slate-950/70 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-300/10 text-brand-300">02</span>
                  <p className="text-sm text-slate-200">Receive smart reminders so nothing slips through the cracks.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <footer className="mx-auto mt-8 w-full max-w-5xl px-4 text-center text-sm text-slate-500 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft backdrop-blur-xl">
          <p>© 2026 Xholo. Subscription Center for recurring payments and smart billing.</p>
          <div className="mt-3 flex flex-col items-center justify-center gap-3 text-xs text-slate-400 sm:flex-row sm:gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
