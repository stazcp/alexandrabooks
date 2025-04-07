'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Book } from '@/app/lib/types'
import {
  fallbackBooks,
  getFallbackImage,
  getFilteredFallbackBooks,
  AUTHOR_AMAZON_PAGE,
} from '@/app/lib/fallback-data'
import { Button } from '@/components/ui/button'

interface BookDisplayProps {
  books: Book[]
  isLoading: boolean
  error: Error | null
}

export function BookDisplay({ books, isLoading, error }: BookDisplayProps) {
  // Add state to detect if loading is taking too long
  const [showFallbacksAfterTimeout, setShowFallbacksAfterTimeout] = useState(false)

  // Set a timeout to show fallbacks if loading takes too long
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.log('BookDisplay component loading timeout reached')
        setShowFallbacksAfterTimeout(true)
      }, 5000) // 5 seconds max loading time before showing fallbacks

      return () => clearTimeout(timeout)
    } else {
      // Reset the timeout state when loading is done
      setShowFallbacksAfterTimeout(false)
    }
  }, [isLoading])

  // Determine which books to display - use provided books or fallback to mock data
  const displayBooks =
    books && books.length > 0
      ? books
      : fallbackBooks.filter((book) => {
          // Filter fallback books based on the series of the first book in the provided books array
          if (books && books[0] && books[0].series) {
            return book.series === books[0].series
          }
          return true // If we can't determine the series, show all fallback books
        })

  // Show loading state when loading (but not if it's been too long)
  if (isLoading && !showFallbacksAfterTimeout) {
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

  // Show fallback content after loading timeout or when there's an error
  if (showFallbacksAfterTimeout || error) {
    const message = showFallbacksAfterTimeout
      ? 'Loading is taking longer than expected. Showing preview content in the meantime.'
      : 'Unable to load books from Amazon API at the moment.'

    return (
      <div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center mb-8">
          <p className="text-amber-500 mb-2">{message}</p>
          <p className="text-gray-600 mb-4">
            {showFallbacksAfterTimeout
              ? "We're still trying to connect to the API..."
              : 'Showing preview content instead. Please try again later.'}
          </p>
          <p className="text-gray-700 mb-4">
            All links will take you to Alexandra's Amazon store page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallbackBooks
            .filter((book) => {
              if (books && books[0] && books[0].series) {
                return book.series === books[0].series
              }
              return true
            })
            .map((book) => (
              <BookCard key={book.ASIN} book={book} />
            ))}
        </div>
      </div>
    )
  }

  if (displayBooks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="mb-4">No books found in this category.</p>
        <p className="mb-6 text-gray-600">
          You can browse all of Alexandra's books on her Amazon author page.
        </p>
        <Button asChild className="bg-gray-800 hover:bg-gray-700">
          <Link href={AUTHOR_AMAZON_PAGE} target="_blank">
            Visit Amazon Store
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayBooks.map((book) => (
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

  // Ensure we always have a valid Amazon URL
  const bookUrl =
    book.detailPageURL && book.detailPageURL !== '#' ? book.detailPageURL : AUTHOR_AMAZON_PAGE

  return (
    <Link href={bookUrl} target="_blank" className={`group ${animationClass}`}>
      <div className="relative">
        <div className="relative flex flex-col items-center bg-white p-6 rounded-xl shadow-md transition-all duration-300 book-card">
          <div className="rounded-lg mb-4 book-shadow">
            <Image
              src={book.imageUrl || getFallbackImage(book.series)}
              alt={book.title}
              width={200}
              height={300}
              className="rounded shadow-lg"
              // Add fallback for when the remote image fails to load
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null // Prevent infinite loop
                target.src = getFallbackImage(book.series)
              }}
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
