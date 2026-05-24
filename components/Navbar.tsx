'use client'

import { motion } from 'framer-motion'
import { Search, ChevronDown, UserCircle2, Bell, Globe2 } from 'lucide-react'
import { Currency, currencyOptions } from '@/lib/data'

type NavbarProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  currency: Currency
  onCurrencyChange: (value: Currency) => void
  onOpenModal: () => void
}

export function Navbar({ searchValue, onSearchChange, currency, onCurrencyChange, onOpenModal }: NavbarProps) {
  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card mb-6 rounded-[2rem] border border-white/10 bg-slate-950/30 p-5 shadow-soft"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.36em] text-brand-300/90">Welcome back</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Manage subscriptions with clarity.</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center justify-center rounded-3xl bg-brand-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-300"
          >
            Add subscription
          </button>
          <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-glow">
            <Globe2 className="h-4 w-4 text-brand-300" />
            <span className="font-medium">{currency}</span>
            <select
              value={currency}
              onChange={(event) => onCurrencyChange(event.target.value as Currency)}
              className="ml-2 bg-transparent text-sm text-slate-200 outline-none"
            >
              {currencyOptions.map((item) => (
                <option key={item.value} value={item.value} className="bg-slate-950 text-white">
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1.7fr_1fr]">
        <label className="group relative block rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-soft transition hover:border-brand-300/60">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search subscriptions, categories..."
            className="w-full bg-transparent pl-12 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          />
        </label>
        <div className="glass-card flex items-center justify-between gap-4 rounded-3xl border-white/10 bg-slate-950/60 p-4 shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Notification</p>
            <p className="mt-2 text-sm text-slate-200">Everything is synced and up-to-date.</p>
          </div>
          <button className="rounded-3xl bg-brand-400/10 p-3 text-brand-300 transition hover:bg-brand-400/20">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
