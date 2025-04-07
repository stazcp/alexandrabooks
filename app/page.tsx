'use client'

import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookDisplay } from '@/components/book-display'
import { useBooks } from '@/hooks/useBooks'
import { Navigation } from '@/components/nav/navigation'

export default function Home() {
  // Use our custom hook to get books data
  const { getAllBooks, getBooksBySeries, getBooksByFeatured, isLoading, error } = useBooks()

  // We can grab our different book collections
  const flyingBooks = getBooksBySeries('The Flying')
  const featuredBooks = getBooksByFeatured(true)

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-gray-800 pattern-bg">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <Navigation />

        <header className="flex flex-col items-center mb-12">
          <p className="text-lg md:text-xl text-gray-700 italic text-center max-w-2xl font-medium squiggle-underline">
            "Visual poems that take the reader on a superb inner flight"
          </p>
        </header>

        <section className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-800 text-center">
                The Flying Collection
              </h2>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center">
                The visual poems, with colourful and unique graphic designs, take the reader on a
                superb inner flight. Alexandra is a modern spiritualist, whose poetic style and
                innovative computer art empower uplift and inspire along the path of spiritual &
                personal growth.
              </p>

              <div className="flex justify-center">
                <Link href="/flying">
                  <Button className="bg-gray-800 hover:bg-gray-700 text-white border-none shadow-lg px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 book-shadow">
                    Discover The Flying
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative group">
                <div className="relative book-card">
                  <Image
                    src="/images/flying12-cover.png"
                    alt="Flying 12 by Alexandra Psaropoulou"
                    width={500}
                    height={600}
                    className="rounded-lg shadow-xl transform transition-all duration-500 book-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-light text-gray-700 mb-2">Alexandra Psaropoulou</h3>
              <div className="text-6xl md:text-7xl font-black tracking-tighter text-gray-800 mb-6">
                FLYING<span className="text-gray-500">12</span>
              </div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Each book offers a unique "inner flying" along this path of spiritual discovery and
                personal transformation.
              </p>
              <Link href="/flying">
                <Button
                  variant="outline"
                  className="border-gray-800 text-gray-800 hover:bg-gray-200 rounded-full px-6"
                >
                  Explore the Book
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-black mb-8 text-center text-gray-800 squiggle-underline inline-block mx-auto">
            Featured Books
          </h2>

          {/* Dynamic book display with limit of 3 books */}
          <BookDisplay books={featuredBooks} isLoading={isLoading} error={error} />

          <div className="mt-8 text-center">
            <Link href="/books">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white border-none shadow-lg px-6 py-5 text-lg rounded-full transition-all duration-300 hover:scale-105 book-shadow">
                Browse Amazon Catalog
              </Button>
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
            <h2 className="text-3xl font-black mb-8 text-center text-gray-800">
              The Flying Series
            </h2>

            {/* Dynamic book display filtered to "The Flying" series */}
            <BookDisplay books={flyingBooks} isLoading={isLoading} error={error} />

            <div className="mt-10 text-center">
              <Link href="/books">
                <Button
                  variant="outline"
                  className="border-gray-800 text-gray-800 hover:bg-gray-200 rounded-full px-6"
                >
                  Complete Amazon Collection
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
