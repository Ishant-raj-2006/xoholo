'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ArrowUpRight, BarChart3, CircleDollarSign, Folder, Sparkles } from 'lucide-react'
import { Currency } from '@/lib/data'

type CategoryDatum = {
  name: string
  value: number
}

type MonthlyDatum = {
  month: string
  value: number
}

type AnalyticsProps = {
  categoryData: CategoryDatum[]
  monthlyData: MonthlyDatum[]
  totalSpending: number
  currency: Currency
}

const categoryColors = ['#22C55E', '#06B6D4', '#F59E0B', '#7C3AED', '#EF4444']

export function AnalyticsSection({ categoryData, monthlyData, totalSpending, currency }: AnalyticsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Spending analytics</p>
            <h2 className="text-2xl font-semibold text-white">Where your money goes.</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <CircleDollarSign className="h-5 w-5 text-brand-300" />
            <span>{currency}</span>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Total monthly spend</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{currency} {totalSpending.toFixed(2)}</p>
              </div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-400/10 text-brand-300 shadow-glow">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 8, right: 0, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, color: '#fff' }}
                    formatter={(value: number) => [value.toFixed(2), currency]}
                  />
                  <Bar dataKey="value" radius={[16, 16, 0, 0]} fill="#C6FF00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Category split</p>
                <p className="mt-2 text-lg font-semibold text-white">Top spending categories</p>
              </div>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-400/10 text-brand-300 shadow-glow">
                <Folder className="h-6 w-6" />
              </div>
            </div>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={categoryColors[index % categoryColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, color: '#fff' }}
                    formatter={(value: number) => [value.toFixed(2), currency]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
              {categoryData.map((datum, index) => (
                <div key={datum.name} className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryColors[index % categoryColors.length] }} />
                    <div>
                      <p className="text-sm text-slate-200">{datum.name}</p>
                      <p className="text-xs text-slate-500">{Math.round((datum.value / (totalSpending || 1)) * 100)}% of total</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">{currency} {datum.value.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Quick insights</p>
              <h2 className="text-2xl font-semibold text-white">Spending highlights.</h2>
            </div>
            <Sparkles className="h-6 w-6 text-brand-300" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-slate-950/70 p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between text-slate-400">
                <p>Monthly average</p>
                <BarChart3 className="h-5 w-5 text-brand-300" />
              </div>
              <p className="text-3xl font-semibold text-white">{currency} {(totalSpending / 1.02).toFixed(2)}</p>
              <p className="mt-3 text-sm text-slate-400">A smooth, consistent burn rate across active subscriptions.</p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-950/70 p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between text-slate-400">
                <p>Renewals soon</p>
                <ArrowUpRight className="h-5 w-5 text-brand-300" />
              </div>
              <p className="text-3xl font-semibold text-white">{monthlyData.filter((item) => item.value > 0).length}</p>
              <p className="mt-3 text-sm text-slate-400">Subscriptions due in the next few billing cycles.</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Spend breakdown</p>
              <h2 className="text-2xl font-semibold text-white">Category momentum.</h2>
            </div>
            <div className="rounded-3xl bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-300">Auto-updating</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white/5 p-5">
              <p className="text-sm text-slate-400">Fastest growing spend</p>
              <p className="mt-3 text-2xl font-semibold text-white">Streaming & media</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/5 p-5">
              <p className="text-sm text-slate-400">Latest category surge</p>
              <p className="mt-3 text-2xl font-semibold text-white">Creative tools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
