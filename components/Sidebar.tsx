'use client'

import { motion } from 'framer-motion'
import { Activity, CreditCard, Download, LayoutDashboard, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Subscriptions', icon: Activity, href: '/#subscriptions' },
  { label: 'Analytics', icon: CreditCard, href: '/#analytics' },
  { label: 'Wallet', icon: ShieldCheck, href: '/#wallet' }
]

type SidebarProps = {
  isOpen?: boolean
  active?: string
  onClose?: () => void
}

export function Sidebar({ isOpen = true, active = 'Dashboard', onClose }: SidebarProps) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`glass-card flex h-full min-h-screen flex-col justify-between border-white/10 p-6 shadow-glow ${
        isOpen ? 'w-80' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="group flex w-full items-center gap-3 text-left text-white"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-brand-400 shadow-glow">
              <span className="text-xl font-semibold">X</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300/80">Xholo</p>
              <p className="text-2xl font-semibold tracking-tight">Subscription Center</p>
            </div>
          </button>
          {menuOpen ? (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-soft">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Account</p>
              <p className="mt-3 text-sm font-semibold text-white">Demo User</p>
              <p className="text-sm text-slate-400">demo@xholo.com</p>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                <p className="font-medium text-white">Active plans</p>
                <p className="text-slate-400">5 subscriptions</p>
              </div>
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="mt-4 w-full rounded-3xl bg-brand-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-300"
              >
                Log out
              </button>
            </motion.div>
          ) : null}
          <p className="text-sm leading-6 text-slate-300/80">
            A premium subscription cockpit with analytics, timeline, and checkout control.
          </p>
        </div>
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = item.label === active
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center gap-4 rounded-3xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-400/15 text-brand-100 shadow-[0_0_24px_rgba(198,255,0,0.12)]'
                    : 'text-slate-300/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
        <div className="space-y-4 border-t border-white/10 pt-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quick actions</p>
          <div className="grid gap-2">
            <a href="/xholo-mobile-app.apk" download className="inline-flex items-center justify-center rounded-3xl bg-brand-400 px-4 py-3 text-slate-950 transition hover:bg-brand-300">
              <Download className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 text-sm text-slate-300 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Pro tip</p>
        <p className="mt-3 leading-6">
          Use the module to keep all recurring payments synced, preview renewals, and stay one step ahead.
        </p>
      </div>
    </motion.aside>
  )
}
