'use client'

import { Sparkles, TrendingUp, ShieldCheck, Star } from 'lucide-react'

export type Insight = {
  title: string
  description: string
  accent: string
}

type InsightsProps = {
  insights: Insight[]
}

export function InsightsPanel({ insights }: InsightsProps) {
  return (
    <div className="glass-card rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-brand-300/90">Smart insights</p>
          <h2 className="text-2xl font-semibold text-white">AI-inspired recommendations.</h2>
        </div>
        <Sparkles className="h-6 w-6 text-brand-300" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-soft transition hover:-translate-y-1 hover:border-brand-300/70"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-3xl ${
                insight.accent === 'green'
                  ? 'bg-emerald-400/10 text-emerald-300'
                  : insight.accent === 'blue'
                  ? 'bg-sky-400/10 text-sky-300'
                  : insight.accent === 'yellow'
                  ? 'bg-amber-400/10 text-amber-300'
                  : 'bg-violet-400/10 text-violet-300'
              }`}>
                {insight.accent === 'green' ? <ShieldCheck className="h-5 w-5" /> : insight.accent === 'blue' ? <TrendingUp className="h-5 w-5" /> : insight.accent === 'yellow' ? <Star className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              </div>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Insight</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
