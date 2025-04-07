'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Book } from '@/app/lib/types'

interface BookGridProps {
  series?: string
  limit?: number
}

export default function BookGrid({ series, limit }: BookGridProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true)
        const url = new URL('/api/books', window.location.origin)
        if (series) {
          url.searchParams.append('series', series)
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }

        const data = await response.json()
        let booksData = data.books

        // Check if books have all required properties
        // Add any missing properties with defaults
        booksData = booksData.map((book: any) => ({
          ASIN: book.ASIN || book.asin || `book-${Math.random().toString(36).substr(2, 9)}`,
          title: book.title || 'Untitled Book',
          author: book.author || 'Alexandra Psaropoulou',
          imageUrl: book.imageUrl || '/images/placeholder-cover.jpg',
          price: book.price,
          currency: book.currency,
          detailPageURL: book.detailPageURL || book.amazonUrl || '#',
          description: book.description || 'No description available',
          series: book.series || series || 'Other Works',
          publicationDate: book.publicationDate,
          isPrimeEligible: book.isPrimeEligible || false,
        }))

        // Apply limit if specified
        if (limit && booksData.length > limit) {
          booksData = booksData.slice(0, limit)
        }

        setBooks(booksData)
      } catch (err) {
        console.error('Error fetching books:', err)
        setError('Unable to load books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [series, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(limit || 3)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-red-500">{error}</p>
        <p className="mt-2">Using local book data instead.</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p>No books found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.ASIN} book={book} />
      ))}
    </div>
  )
}

function BookCard({ book }: { book: Book }) {
  const [animationClass, setAnimationClass] = useState('float-animation')

  // Only run on client-side after hydration
  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 3)
    setAnimationClass(`float-animation float-animation-delay-${randomDelay}`)
  }, [])

  // Format price display
  const displayPrice =
    book.price && book.currency ? (book.currency === 'USD' ? `$${book.price}` : book.price) : null

  return (
    <Link href={book.detailPageURL} target="_blank" className={`group ${animationClass}`}>
      <div className="relative">
        <div className="relative flex flex-col items-center bg-white p-6 rounded-xl shadow-md transition-all duration-300 book-card">
          <div className="rounded-lg mb-4 book-shadow">
            <Image
              src={book.imageUrl}
              alt={book.title}
              width={200}
              height={300}
              className="rounded shadow-lg"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-600 text-center">
            {book.title}
          </h3>
          {book.publicationDate && (
            <p className="text-xs text-gray-500 mt-1">{book.publicationDate}</p>
          )}
          {displayPrice && <p className="text-sm text-gray-600 mt-1">{displayPrice}</p>}
        </div>
      </div>
    </Link>
  )
}
