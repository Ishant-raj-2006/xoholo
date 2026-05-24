'use client'

import { ArrowRight, CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Subscription, Currency } from '@/lib/data'
import { ServiceLogo } from '@/components/ServiceLogo'
import { convertCurrency, formatCurrency, formatDateString, getDaysRemaining } from '@/lib/utils'

type RenewalsProps = {
  subscriptions: Subscription[]
  currency: Currency
  onManage: (subscription: Subscription) => void
}

export function UpcomingRenewals({ subscriptions, currency, onManage }: RenewalsProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
  }, [])

  return (
    <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Upcoming renewals</p>
          <h2 className="text-2xl font-semibold text-white">Renewals approaching soon.</h2>
        </div>
        <button className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-brand-300/70">
          View all
        </button>
      </div>
      <div className="divide-y divide-white/5">
        {subscriptions.slice(0, 5).map((subscription) => {
          const days = now ? getDaysRemaining(subscription.renewalDate, now) : 0
          return (
            <div key={subscription.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <ServiceLogo name={subscription.name} accent={subscription.accent} />
                <div>
                  <p className="font-medium text-white">{subscription.name}</p>
                  <p className="text-sm text-slate-400">{subscription.category}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-3xl bg-white/5 px-3 py-2">
                  <CalendarDays className="h-4 w-4 text-brand-300" />
                  {formatDateString(subscription.renewalDate)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-3xl bg-white/5 px-3 py-2 text-white">
                  {formatCurrency(convertCurrency(subscription.priceUSD, currency), currency)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-3xl bg-brand-400/10 px-3 py-2 text-brand-300">
                  {days >= 0 ? `${days}d left` : 'Expired'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onManage(subscription)}
                className="flex items-center gap-2 text-brand-300 transition hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
                <span>Manage</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
