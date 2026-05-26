'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Clock3, Inbox, ShieldCheck, X } from 'lucide-react'
import { Subscription, Currency } from '@/lib/data'
import { convertCurrency, formatCurrency, formatDateString, getDaysRemaining } from '@/lib/utils'

type ManageModalProps = {
  isOpen: boolean
  subscription: Subscription | null
  currency: Currency
  onClose: () => void
  onAction: (message: string) => void
}

export function ManageSubscriptionModal({ isOpen, subscription, currency, onClose, onAction }: ManageModalProps) {
  if (!subscription) return null

  const daysLeft = getDaysRemaining(subscription.renewalDate)

  function handleAction(action: string) {
    switch (action) {
      case 'notify':
        onAction(`Notification sent for ${subscription?.name}.`)
        break
      case 'reminder':
        onAction(`Reminder set for ${subscription?.name}.`)
        break
      case 'receipt':
        onAction(`Receipt ready for ${subscription?.name}.`)
        break
      case 'pause':
        onAction(`${subscription?.name} auto-renewal paused.`)
        break
      default:
        onAction('Action completed.')
    }
    onClose()
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
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-soft"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Manage plan</p>
                <h2 className="text-3xl font-semibold text-white">{subscription.name}</h2>
                <p className="mt-2 text-sm text-slate-400">Full control over notifications, reminders, and billing preferences.</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Next renewal</p>
                <p className="mt-3 text-lg font-semibold text-white">{formatDateString(subscription.renewalDate)}</p>
                <p className="mt-1 text-sm text-slate-400">{daysLeft >= 0 ? `${daysLeft} days left` : 'Expired'}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Billing</p>
                <p className="mt-3 text-lg font-semibold text-white">{formatCurrency(convertCurrency(subscription.priceUSD, currency), currency)}</p>
                <p className="mt-1 text-sm text-slate-400">{subscription.billingCycle} payment</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Status</p>
                <p className="mt-3 text-lg font-semibold text-white">{subscription.autoRenew ? 'Auto-renew on' : 'Auto-renew off'}</p>
                <p className="mt-1 text-sm text-slate-400">{subscription.category}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleAction('notify')}
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-brand-400/10 px-5 py-4 text-left text-white transition hover:border-brand-300/70 hover:bg-brand-400/15"
              >
                <Bell className="h-5 w-5 text-brand-300" />
                <div>
                  <p className="font-semibold">Send notification</p>
                  <p className="text-sm text-slate-400">Alert the user about the next renewal.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleAction('reminder')}
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-left text-white transition hover:border-brand-300/70 hover:bg-white/10"
              >
                <Clock3 className="h-5 w-5 text-brand-300" />
                <div>
                  <p className="font-semibold">Set reminder</p>
                  <p className="text-sm text-slate-400">Receive a reminder before the next bill.</p>
                </div>
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleAction('pause')}
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-left text-white transition hover:border-brand-300/70 hover:bg-white/10"
              >
                <ShieldCheck className="h-5 w-5 text-brand-300" />
                <div>
                  <p className="font-semibold">Pause auto-renew</p>
                  <p className="text-sm text-slate-400">Temporarily stop renewal for this subscription.</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleAction('receipt')}
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-left text-white transition hover:border-brand-300/70 hover:bg-white/10"
              >
                <Inbox className="h-5 w-5 text-brand-300" />
                <div>
                  <p className="font-semibold">View receipt</p>
                  <p className="text-sm text-slate-400">Download or preview your latest invoice.</p>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
