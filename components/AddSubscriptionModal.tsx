'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Plus, Sparkle, Timer, Tag, ToggleLeft } from 'lucide-react'
import { Currency, Subscription, currencyOptions } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (subscription: Subscription) => void
  currency: Currency
  initialData?: Subscription | null
}

const categoryOptions = [
  'Entertainment',
  'Music',
  'Productivity',
  'Creativity',
  'Utilities'
]

const iconOptions = [
  { label: 'Film', value: 'Film' },
  { label: 'Music', value: 'Music2' },
  { label: 'Palette', value: 'Palette' },
  { label: 'Dashboard', value: 'LayoutDashboard' },
  { label: 'Play', value: 'PlayCircle' }
]

export function AddSubscriptionModal({ isOpen, onClose, onSubmit, currency, initialData }: ModalProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Entertainment')
  const [iconKey, setIconKey] = useState('Film')
  const [price, setPrice] = useState('12.99')
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly')
  const [renewalDate, setRenewalDate] = useState('2026-06-25')
  const [autoRenew, setAutoRenew] = useState(true)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setCategory(initialData.category)
      setIconKey(initialData.iconKey)
      setPrice(initialData.priceUSD.toString())
      setBillingCycle(initialData.billingCycle)
      setRenewalDate(initialData.renewalDate)
      setAutoRenew(initialData.autoRenew)
    }
  }, [initialData])

  function handleSubmit() {
    if (!name.trim() || Number(price) <= 0) return
    const newSub: Subscription = {
      id: initialData?.id ?? `sub-${Date.now()}`,
      name: name.trim(),
      category,
      iconKey,
      priceUSD: Number(price),
      billingCycle,
      renewalDate,
      autoRenew,
      accent: initialData?.accent ?? '#C6FF00'
    }
    onSubmit(newSub)
    setName('')
    setCategory('Entertainment')
    setIconKey('Film')
    setPrice('12.99')
    setBillingCycle('Monthly')
    setRenewalDate('2026-06-25')
    setAutoRenew(true)
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
        >
          <motion.div
            initial={{ y: 42, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card w-full max-w-2xl rounded-[2rem] border-white/10 bg-slate-950/90 p-8 shadow-soft"
          >
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">New subscription</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">Add a recurring plan.</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200 shadow-glow">
                <Sparkle className="h-5 w-5 text-brand-300" />
                <span>Instant dashboard update</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Subscription name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Figma, Netflix"
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-brand-400/70"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Price ({currency})
                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  type="number"
                  step="0.01"
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-brand-400/70"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Category
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-brand-400/70"
                >
                  {categoryOptions.map((value) => (
                    <option key={value} value={value} className="bg-slate-950 text-white">
                      {value}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Billing cycle
                <select
                  value={billingCycle}
                  onChange={(event) => setBillingCycle(event.target.value as 'Monthly' | 'Quarterly' | 'Yearly')}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-brand-400/70"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Renewal date
                <input
                  value={renewalDate}
                  onChange={(event) => setRenewalDate(event.target.value)}
                  type="date"
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-brand-400/70"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                App icon
                <select
                  value={iconKey}
                  onChange={(event) => setIconKey(event.target.value)}
                  className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-brand-400/70"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 shadow-soft">
                <ToggleLeft className="h-5 w-5 text-brand-300" />
                <span>Auto-renew</span>
                <input
                  type="checkbox"
                  checked={autoRenew}
                  onChange={(event) => setAutoRenew(event.target.checked)}
                  className="h-5 w-5 rounded-md border border-white/10 bg-slate-900 text-brand-400 accent-brand-400"
                />
              </label>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-soft">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Preview</p>
                <p className="mt-2 text-sm text-slate-200">
                  {name || 'Subscription name'} • {category} • {billingCycle}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {formatCurrency(Number(price) || 0, currency)} / {billingCycle.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={onClose}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-brand-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-300"
              >
                <Plus className="h-4 w-4" />
                Save subscription
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
