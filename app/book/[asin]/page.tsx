import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BookDetail from '@/app/components/book-detail'
import { Navigation } from '@/components/nav/navigation'

interface BookPageProps {
  params: {
    asin: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  const { asin } = params

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-gray-800 pattern-bg">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <Navigation />

        <Link
          href="/"
          className="inline-flex items-center text-gray-800 hover:text-gray-600 mb-8 group transition-all duration-300 font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <section className="max-w-5xl mx-auto mb-16">
          <BookDetail asin={asin} />
        </section>
      </div>
    </div>
  )
}
