import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Money Transfer App',
  description: 'A simple money transfer application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}