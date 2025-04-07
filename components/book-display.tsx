'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Book } from '@/app/lib/types'

interface BookDisplayProps {
  books: Book[]
  isLoading: boolean
  error: Error | null
}

export function BookDisplay({ books, isLoading, error }: BookDisplayProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
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
        <p className="text-red-500">Unable to load books. Please try again later.</p>
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
  const randomDelay = Math.floor(Math.random() * 3)
  const animationClass = `float-animation float-animation-delay-${randomDelay}`

  // Format price display
  const displayPrice =
    book.price === 'N/A' ? 'N/A' : book.currency === 'USD' ? `$${book.price}` : book.price

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
          {book.publicationDate !== 'N/A' && (
            <p className="text-xs text-gray-500 mt-1">{book.publicationDate}</p>
          )}
          <p className="text-sm text-gray-600 mt-1">{displayPrice}</p>
        </div>
      </div>
    </Link>
  )
}
