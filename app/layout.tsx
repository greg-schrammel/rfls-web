import { Inter } from 'next/font/google'
import './globals.css'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Rfls',
  description: 'Raffles but onchain',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`font-sans ${sans.variable} bg-gray-100 text-gray-900 selection:bg-red-400/20`}
    >
      <body>{children}</body>
    </html>
  )
}
