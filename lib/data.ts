export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY'

export type Subscription = {
  id: string
  name: string
  category: string
  iconKey: string
  priceUSD: number
  billingCycle: 'Monthly' | 'Quarterly' | 'Yearly'
  renewalDate: string
  autoRenew: boolean
  accent: string
}

export const currencyOptions: { label: string; value: Currency }[] = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'INR', value: 'INR' },
  { label: 'JPY', value: 'JPY' }
]

export const currencyRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.8,
  JPY: 150
}

export const categoryColorMap: Record<string, string> = {
  Entertainment: '#7C3AED',
  Music: '#06B6D4',
  Productivity: '#22C55E',
  Creativity: '#F59E0B',
  Utilities: '#A855F7'
}

export const baseSubscriptions: Subscription[] = [
  {
    id: 'sub-1',
    name: 'Netflix',
    category: 'Entertainment',
    iconKey: 'Film',
    priceUSD: 15.99,
    billingCycle: 'Monthly',
    renewalDate: '2026-06-08',
    autoRenew: true,
    accent: '#C75EFA'
  },
  {
    id: 'sub-2',
    name: 'Spotify',
    category: 'Music',
    iconKey: 'Music2',
    priceUSD: 9.99,
    billingCycle: 'Monthly',
    renewalDate: '2026-06-02',
    autoRenew: true,
    accent: '#06B6D4'
  },
  {
    id: 'sub-3',
    name: 'Adobe Creative',
    category: 'Creativity',
    iconKey: 'Palette',
    priceUSD: 29.99,
    billingCycle: 'Monthly',
    renewalDate: '2026-06-16',
    autoRenew: true,
    accent: '#F59E0B'
  },
  {
    id: 'sub-4',
    name: 'Notion',
    category: 'Productivity',
    iconKey: 'LayoutDashboard',
    priceUSD: 8.00,
    billingCycle: 'Monthly',
    renewalDate: '2026-06-12',
    autoRenew: true,
    accent: '#22C55E'
  },
  {
    id: 'sub-5',
    name: 'YouTube Premium',
    category: 'Utilities',
    iconKey: 'PlayCircle',
    priceUSD: 12.99,
    billingCycle: 'Monthly',
    renewalDate: '2026-06-24',
    autoRenew: false,
    accent: '#EF4444'
  }
]
