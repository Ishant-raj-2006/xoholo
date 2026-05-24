import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xholo — Subscription Control',
  description: 'A premium subscription management dashboard for modern recurring payments.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
