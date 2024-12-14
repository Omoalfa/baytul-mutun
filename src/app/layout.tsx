import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Baytul Mutun Wal Manzumaat',
  description: 'Islamic Learning Platform',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
        <Navbar />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
