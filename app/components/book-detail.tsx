'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Book } from '@/app/lib/types'
import { AUTHOR_AMAZON_PAGE } from '@/app/lib/fallback-data'

interface BookDetailProps {
  asin: string
}

export default function BookDetail({ asin }: BookDetailProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true)
        // In a real implementation, you would fetch a single book by ASIN
        // For now, we'll fetch all books and find the one we want
        const response = await fetch('/api/books')

        if (!response.ok) {
          throw new Error('Failed to fetch book')
        }

        const data = await response.json()
        const foundBook = data.books.find((b: Book) => b.ASIN === asin)

        if (!foundBook) {
          throw new Error('Book not found')
        }

        setBook(foundBook)
      } catch (err) {
        console.error('Error fetching book:', err)
        setError('Unable to load book details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [asin])

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 h-80 bg-gray-200 rounded-lg"></div>
          <div className="w-full md:w-2/3">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-red-500">{error || 'Book not found'}</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md doodle-border">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex justify-center">
          <div className="relative book-shadow rounded-lg">
            <Image
              src={book.imageUrl || '/placeholder.svg'}
              alt={book.title}
              width={300}
              height={450}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-black text-gray-800 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

          <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>

          <div className="mb-6">
            <p className="text-gray-700">
              <strong>Series:</strong> {book.series}
            </p>
            {book.publicationDate && (
              <p className="text-gray-700">
                <strong>Publication Date:</strong> {book.publicationDate}
              </p>
            )}
            {book.price && (
              <p className="text-gray-700">
                <strong>Price:</strong> ${book.price}
              </p>
            )}
          </div>

          <Link href={book.detailPageURL || AUTHOR_AMAZON_PAGE} target="_blank">
            <Button className="bg-gray-800 hover:bg-gray-700 text-white border-none shadow-lg rounded-full transition-all duration-300 hover:scale-105 book-shadow">
              Buy on Amazon
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
