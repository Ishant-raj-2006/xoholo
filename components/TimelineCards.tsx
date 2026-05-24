'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Edit3, Trash2, Clock3 } from 'lucide-react'
import { Subscription, Currency } from '@/lib/data'
import { ServiceLogo } from '@/components/ServiceLogo'
import { convertCurrency, formatCurrency, formatDateString, getDaysRemaining, getProgressFraction } from '@/lib/utils'

type TimelineProps = {
  subscriptions: Subscription[]
  currency: Currency
  onEdit: (subscription: Subscription) => void
  onDelete: (id: string) => void
}

export function TimelineCards({ subscriptions, currency, onEdit, onDelete }: TimelineProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
  }, [])

  return (
    <div className="glass-card overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Subscription timeline</p>
          <h2 className="text-2xl font-semibold text-white">Track every renewal as it approaches.</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-400">
          The timeline updates instantly when you add, edit, or remove subscriptions. Premium insight for every renewal.
        </p>
      </div>
      <div className="hide-scrollbar flex gap-5 overflow-x-auto pb-2">
        {subscriptions.map((subscription, index) => {
          const days = now ? getDaysRemaining(subscription.renewalDate, now) : 0
          const progress = now ? Math.max(0.08, getProgressFraction(subscription.renewalDate, now)) : 0.08
          const isUrgent = days <= 5
          return (
            <motion.article
              key={subscription.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`relative min-w-[260px] rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 shadow-soft transition-shadow duration-300 ${
                isUrgent ? 'animate-pulse-glow border-red-400/30' : ''
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <ServiceLogo name={subscription.name} accent={subscription.accent} />
                <div className="flex items-center gap-3">
                  <button onClick={() => onEdit(subscription)} className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/5">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(subscription.id)} className="rounded-full border border-white/10 p-2 text-rose-300 transition hover:bg-rose-500/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-400">{subscription.category}</p>
                  <h3 className="text-xl font-semibold text-white">{subscription.name}</h3>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                    <span>{formatCurrency(convertCurrency(subscription.priceUSD, currency), currency)} / {subscription.billingCycle.toLowerCase()}</span>
                    <span className="inline-flex items-center gap-1 text-brand-300">
                      <Clock3 className="h-4 w-4" />
                      {days >= 0 ? `${days}d left` : 'Expired'}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, progress * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Renewal</span>
                  <span>{formatDateString(subscription.renewalDate)}</span>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-8 top-8 hidden h-32 w-32 rounded-full bg-brand-400/10 blur-3xl sm:block" />
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
