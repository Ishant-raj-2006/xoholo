'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Globe2, Sparkles } from 'lucide-react'
import { AddSubscriptionModal } from '../components/AddSubscriptionModal'
import { AnalyticsSection } from '../components/AnalyticsSection'
import { InsightsPanel } from '../components/InsightsPanel'
import { ManageSubscriptionModal } from '../components/ManageSubscriptionModal'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { TimelineCards } from '../components/TimelineCards'
import { UpcomingRenewals } from '../components/UpcomingRenewals'
import { baseSubscriptions, categoryColorMap, currencyOptions } from '../lib/data'
import { Currency, Subscription } from '../lib/data'
import { convertCurrency, formatCurrency, formatDateString } from '../lib/utils'

const billingFactor = (cycle: Subscription['billingCycle']) => {
  if (cycle === 'Yearly') return 12
  if (cycle === 'Quarterly') return 3
  return 1
}

export default function HomePage() {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [query, setQuery] = useState('')
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(baseSubscriptions)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeSubscription, setActiveSubscription] = useState<Subscription | null>(null)
  const [manageOpen, setManageOpen] = useState(false)
  const [managedSubscription, setManagedSubscription] = useState<Subscription | null>(null)
  const [toast, setToast] = useState('')

  const filteredSubscriptions = useMemo(() => {
    const term = query.toLowerCase()
    return subscriptions.filter((item) => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term))
  }, [query, subscriptions])

  const totalMonthly = useMemo(() => {
    return filteredSubscriptions.reduce((sum, item) => sum + item.priceUSD / billingFactor(item.billingCycle), 0)
  }, [filteredSubscriptions])

  const categoryData = useMemo(() => {
    const categories = filteredSubscriptions.reduce<Record<string, number>>((acc, item) => {
      const value = item.priceUSD / billingFactor(item.billingCycle)
      acc[item.category] = (acc[item.category] || 0) + value
      return acc
    }, {})
    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }, [filteredSubscriptions])

  const monthlyData = useMemo(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return labels.map((month, index) => ({ month, value: Number((totalMonthly * (0.8 + index * 0.05)).toFixed(2)) }))
  }, [totalMonthly])

  const upcomingRenewals = useMemo(() => {
    return [...subscriptions].sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
  }, [subscriptions])

  const [insightStats, setInsightStats] = useState({ renewalsThisWeek: 0, change: 0 })
  const { renewalsThisWeek, change } = insightStats

  const insights = useMemo(() => {
    const topCategory = categoryData.sort((a, b) => b.value - a.value)[0]?.name ?? 'Entertainment'

    return [
      {
        title: `You spend most on ${topCategory.toLowerCase()}.`,
        description: `Your ${topCategory} subscriptions make up a large portion of your spending.`,
        accent: 'green'
      },
      {
        title: `${renewalsThisWeek} subscriptions renew this week.`,
        description: 'Stay ahead of the next billing cycle and avoid surprise charges.',
        accent: 'blue'
      },
      {
        title: `Monthly spending increased by ${change}%.`,
        description: 'Your dashboard is tracking momentum across your recurring plans.',
        accent: 'yellow'
      },
      {
        title: 'Auto-renew helps keep access seamless.',
        description: 'Most of your plans are set to auto-renew, giving you uninterrupted service.',
        accent: 'purple'
      }
    ]
  }, [categoryData, totalMonthly, upcomingRenewals, insightStats])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const renewalsThisWeek = upcomingRenewals.filter((subscription) => {
      const days = Math.ceil((new Date(subscription.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      return days <= 7 && days >= 0
    }).length

    const change = totalMonthly > 0 ? Number(((Math.random() * 14 + 8).toFixed(1))) : 0
    setInsightStats({ renewalsThisWeek, change })
  }, [categoryData, totalMonthly, upcomingRenewals])

  function handleAdd(subscription: Subscription) {
    setSubscriptions((current) => {
      const exists = current.some((item) => item.id === subscription.id)
      if (exists) {
        return current.map((item) => (item.id === subscription.id ? subscription : item))
      }
      return [subscription, ...current]
    })
    setActiveSubscription(null)
    setModalOpen(false)
    setToast(subscription.id.startsWith('sub-') ? 'Subscription added successfully' : 'Subscription updated successfully')
  }

  function handleEdit(subscription: Subscription) {
    setActiveSubscription(subscription)
    setModalOpen(true)
  }

  function handleManage(subscription: Subscription) {
    setManagedSubscription(subscription)
    setManageOpen(true)
  }

  function handleManageClose() {
    setManageOpen(false)
    setManagedSubscription(null)
  }

  function handleManageAction(message: string) {
    setToast(message)
    handleManageClose()
  }

  function handleDelete(id: string) {
    setSubscriptions((current) => current.filter((item) => item.id !== id))
    setToast('Subscription deleted')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f1117] pb-10 text-slate-100">
      <div className="absolute left-1/2 top-0 h-[420px] w-[440px] -translate-x-1/2 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="relative mx-auto flex min-h-screen max-w-[1800px] gap-6 px-4 py-6 xl:px-8">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <Navbar
            searchValue={query}
            onSearchChange={setQuery}
            currency={currency}
            onCurrencyChange={setCurrency}
            onOpenModal={() => {
              setActiveSubscription(null)
              setModalOpen(true)
            }}
          />
          <div className="grid gap-6 xl:grid-cols-[1fr_0.66fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Balance</p>
                <p className="mt-4 text-3xl font-semibold text-white">{formatCurrency(convertCurrency(totalMonthly, currency), currency)} / month</p>
                <p className="mt-3 text-sm text-slate-400">Projected recurring spend based on active subscriptions.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Subscriptions</p>
                <p className="mt-4 text-3xl font-semibold text-white">{filteredSubscriptions.length}</p>
                <p className="mt-3 text-sm text-slate-400">Active plans currently powering your workflow.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Next renewal</p>
                <p className="mt-4 text-3xl font-semibold text-white">{upcomingRenewals[0] ? formatDateString(upcomingRenewals[0].renewalDate) : '-'}</p>
                <p className="mt-3 text-sm text-slate-400">Keep an eye on the next billing date and avoid surprises.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Auto-renewal</p>
                <p className="mt-4 text-3xl font-semibold text-white">{subscriptions.filter((sub) => sub.autoRenew).length}</p>
                <p className="mt-3 text-sm text-slate-400">Subscriptions set to auto-renew for seamless access.</p>
              </motion.div>
            </div>
            <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Snapshot</p>
                  <h2 className="text-2xl font-semibold text-white">Instant revenue profile.</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-brand-400/10 px-4 py-3 text-sm font-semibold text-brand-300">
                  <ArrowUpRight className="h-4 w-4" /> Live
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(categoryColorMap).slice(0, 4).map(([label]) => (
                  <div key={label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(convertCurrency(subscriptions.filter((sub) => sub.category === label).reduce((sum, item) => sum + item.priceUSD / billingFactor(item.billingCycle), 0), currency), currency)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="subscriptions">
            <TimelineCards subscriptions={filteredSubscriptions} currency={currency} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
          <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]" id="analytics">
            <AnalyticsSection categoryData={categoryData} monthlyData={monthlyData} totalSpending={convertCurrency(totalMonthly, currency)} currency={currency} />
            <div className="space-y-6" id="wallet">
              <UpcomingRenewals subscriptions={upcomingRenewals} currency={currency} onManage={handleManage} />
              <InsightsPanel insights={insights} />
            </div>
          </div>
        </main>
      </div>
      <AnimatePresence>
        {modalOpen ? (
          <AddSubscriptionModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false)
              setActiveSubscription(null)
            }}
            onSubmit={handleAdd}
            currency={currency}
            initialData={activeSubscription}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 right-6 z-50 rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-4 text-sm text-white shadow-soft"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ManageSubscriptionModal
        isOpen={manageOpen}
        subscription={managedSubscription}
        currency={currency}
        onClose={handleManageClose}
        onAction={handleManageAction}
      />
      <footer className="mx-auto mt-10 w-full max-w-[1800px] px-4 pb-8 text-center text-sm text-slate-400 xl:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-slate-300">© 2026 Xholo. Subscription Center for recurring payment management.</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 text-xs text-slate-500 sm:flex-row sm:gap-6">
            <span className="transition hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="transition hover:text-white cursor-pointer">Terms of Service</span>
            <span className="transition hover:text-white cursor-pointer">Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
