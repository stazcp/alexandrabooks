import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Providers from './providers'
import './globals.css'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alexandra Books - Poetry and Visual Art',
  description:
    'Discover the Flying series and other works by Alexandra Psaropoulou, featuring visual poems and spiritual exploration.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'
