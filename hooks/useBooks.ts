'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Book } from '@/app/lib/types'
import { fallbackBooks } from '@/app/lib/fallback-data'

/**
 * Custom hook to fetch and manage book data across components
 * Provides filtering by series and limiting results
 */
export function useBooks() {
  const [allBooks, setAllBooks] = useState<Book[]>([])
  // Add custom loading state that we can control manually
  const [customLoading, setCustomLoading] = useState(true)

  // Fetch all books with TanStack Query
  const {
    data: books,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }

        const data = await response.json()
        return normalizeBookData(data.books)
      } catch (err) {
        console.error('Error fetching books:', err)
        throw err
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  })

  // Manage loading state with a timeout to prevent it from getting stuck
  useEffect(() => {
    if (books) {
      // If we have books, we're done loading
      setAllBooks(books)
      setCustomLoading(false)
    } else if (queryError) {
      // If we have an error, we're done loading
      setCustomLoading(false)
    } else if (queryLoading) {
      // If query is still loading, set a timeout to prevent infinite loading
      const timeout = setTimeout(() => {
        console.log('Loading timeout reached - forcing loading state to complete')
        setCustomLoading(false)
      }, 5000) // 5 seconds max loading time

      return () => clearTimeout(timeout)
    }
  }, [books, queryLoading, queryError])

  // Function to filter books by series
  const getBooksBySeries = (series?: string, limit?: number) => {
    // Use real books if available, or fallbacks if there's an error, or empty array if loading is stuck
    const booksToUse = books || (queryError ? fallbackBooks : [])

    let filteredBooks = series
      ? booksToUse.filter((book) => book.series.toLowerCase() === series.toLowerCase())
      : booksToUse

    // Apply limit if specified
    if (limit && filteredBooks.length > limit) {
      filteredBooks = filteredBooks.slice(0, limit)
    }

    return filteredBooks
  }

  // Function to get all books with optional limit
  const getAllBooks = (limit?: number) => {
    // Use real books if available, or fallbacks if there's an error, or empty array if loading is stuck
    const booksToUse = books || (queryError ? fallbackBooks : [])

    if (limit && booksToUse.length > limit) {
      return booksToUse.slice(0, limit)
    }

    return booksToUse
  }

  // Function to get featured books
  const getBooksByFeatured = (featured: boolean = true, limit?: number) => {
    // Use real books if available, or fallbacks if there's an error, or empty array if loading is stuck
    const booksToUse = books || (queryError ? fallbackBooks : [])

    // For this implementation, we'll just take the first few books
    let filteredBooks = featured ? booksToUse.slice(0, 3) : []

    // Apply limit if specified
    if (limit && filteredBooks.length > limit) {
      filteredBooks = filteredBooks.slice(0, limit)
    }

    return filteredBooks
  }

  return {
    allBooks: books || (queryError ? fallbackBooks : []),
    isLoading: customLoading, // Use our controlled loading state
    error: queryError,
    getBooksBySeries,
    getAllBooks,
    getBooksByFeatured,
  }
}

// Helper function to normalize book data with default values
function normalizeBookData(booksData: any[]): Book[] {
  if (!booksData || !Array.isArray(booksData) || booksData.length === 0) {
    return []
  }

  return booksData.map((book: any) => ({
    ASIN: book.ASIN || book.asin || `book-${Math.random().toString(36).substr(2, 9)}`,
    title: book.title || 'Untitled Book',
    author: book.author || 'Alexandra Psaropoulou',
    imageUrl: book.imageUrl || '/images/placeholder-cover.jpg',
    price: book.price || 'N/A',
    currency: book.currency || 'USD',
    detailPageURL: book.detailPageURL || book.amazonUrl || '#',
    description: book.description || 'No description available',
    series: book.series || 'Other Works',
    publicationDate: book.publicationDate || 'N/A',
    isPrimeEligible: book.isPrimeEligible || false,
  }))
}
