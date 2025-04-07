'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { Book } from '@/app/lib/types'

/**
 * Custom hook to fetch and manage book data across components
 * Provides filtering by series and limiting results
 */
export function useBooks() {
  const [allBooks, setAllBooks] = useState<Book[]>([])

  // Fetch all books with TanStack Query
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await fetch('/api/books')
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }

      const data = await response.json()
      return normalizeBookData(data.books)
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false,
  })

  // Set the books state when data is fetched
  useEffect(() => {
    if (books) {
      setAllBooks(books)
    }
  }, [books])

  // Function to filter books by series
  const getBooksBySeries = (series?: string, limit?: number) => {
    if (!books) return []

    let filteredBooks = series
      ? books.filter((book) => book.series.toLowerCase() === series.toLowerCase())
      : books

    // Apply limit if specified
    if (limit && filteredBooks.length > limit) {
      filteredBooks = filteredBooks.slice(0, limit)
    }

    return filteredBooks
  }

  // Function to get all books with optional limit
  const getAllBooks = (limit?: number) => {
    if (!books) return []

    if (limit && books.length > limit) {
      return books.slice(0, limit)
    }

    return books
  }

  // Function to get featured books
  const getBooksByFeatured = (featured: boolean = true, limit?: number) => {
    if (!books) return []

    // For this implementation, we'll just take the first few books
    // You could add a 'featured' field to your Book type and filter by that
    let filteredBooks = featured ? books.slice(0, 3) : []

    // Apply limit if specified
    if (limit && filteredBooks.length > limit) {
      filteredBooks = filteredBooks.slice(0, limit)
    }

    return filteredBooks
  }

  return {
    allBooks,
    isLoading,
    error,
    getBooksBySeries,
    getAllBooks,
    getBooksByFeatured,
  }
}

// Helper function to normalize book data with default values
function normalizeBookData(booksData: any[]): Book[] {
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
