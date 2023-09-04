import './globals.css'

export const metadata = {
  title: 'nums',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`font-sans text-[#1E1A16]`}>
      <body>{children}</body>
    </html>
  )
}
