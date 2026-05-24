import { Currency, currencyRates } from './data'

export function formatCurrency(value: number, currency: Currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(value)
}

export function convertCurrency(valueUSD: number, currency: Currency) {
  return valueUSD * currencyRates[currency]
}

export function formatDateString(date: string) {
  const [year, month, day] = date.split('-')
  if (!year || !month || !day) return date
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[Number(month) - 1]} ${Number(day)}, ${year}`
}

export function getDaysRemaining(date: string, now = new Date()) {
  const target = new Date(date)
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export function getProgressFraction(date: string, now = new Date()) {
  const target = new Date(date)
  const total = Math.max(1, Math.abs((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const remaining = Math.max(0, total)
  return Number(Math.min(1, remaining / 30).toFixed(2))
}

export function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
