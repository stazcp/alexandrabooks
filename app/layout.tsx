import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Link from 'next/link'
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <header className="border-b border-gray-200 bg-white py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
              <Link href="/" className="text-xl font-bold text-primary">
                Alexandra Books
              </Link>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/books" className="text-gray-600 hover:text-primary">
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-primary">
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="relative z-10 border-t border-gray-300 mt-20 py-8 bg-[#f0f0f0]">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Alexandra Books. All rights reserved.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
