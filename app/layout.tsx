import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        {children}
        <footer className="relative z-10 border-t border-gray-300 mt-20 py-8 bg-[#f0f0f0]">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Alexandra Books. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}

import './globals.css'
