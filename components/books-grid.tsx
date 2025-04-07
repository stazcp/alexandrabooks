'use client'

import { useState, useEffect } from 'react'
import { BookCard, BookProps } from '@/components/book-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

interface BooksGridProps {
  series?: string
  initialBooks?: BookProps[]
}

export function BooksGrid({ series, initialBooks }: BooksGridProps) {
  const [books, setBooks] = useState<BookProps[]>(initialBooks || [])
  const [isLoading, setIsLoading] = useState(!initialBooks)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!initialBooks) {
      fetchBooks()
    }
  }, [series, initialBooks])

  async function fetchBooks() {
    setIsLoading(true)
    setError(null)

    try {
      const url = new URL('/api/books', window.location.origin)
      if (series) {
        url.searchParams.append('series', series)
      }

      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`)
      }

      const data = await response.json()
      setBooks(data.books || [])
    } catch (err) {
      console.error('Error fetching books:', err)
      setError('Failed to load books. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <BookSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (books.length === 0) {
    return (
      <Alert>
        <AlertTitle>No books found</AlertTitle>
        <AlertDescription>
          {series
            ? `No books found in the "${series}" series.`
            : 'No books found. Please try again later.'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.ASIN} {...book} />
      ))}
    </div>
  )
}

function BookSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <Skeleton className="h-64 w-full" />
      <div className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="mb-4 h-4 w-1/2" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="mt-auto flex items-center justify-between p-4">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  )
}
