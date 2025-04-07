import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import BookGrid from "@/app/components/book-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-gray-800 pattern-bg">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Alexandra Books Logo" width={120} height={50} className="h-auto" />
          </div>

          <nav className="hidden md:block">
            <div className="flex flex-wrap justify-center gap-2 md:gap-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/flying">The Flying</NavLink>
              <NavLink href="/other-books">Other Books</NavLink>
              <NavLink href="/reviews">Reviews</NavLink>
              <NavLink href="/bio">Bio</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-md">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/flying">Flying</NavLink>
            <NavLink href="/other-books">Books</NavLink>
            <NavLink href="/reviews">Reviews</NavLink>
            <NavLink href="/bio">Bio</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </nav>

        <header className="flex flex-col items-center mb-12">
          <p className="text-lg md:text-xl text-gray-700 italic text-center max-w-2xl font-medium squiggle-underline">
            "Visual poems that take the reader on a superb inner flight"
          </p>
        </header>

        <section className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-800 text-center">The Flying Collection</h2>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center">
                The visual poems, with colourful and unique graphic designs, take the reader on a superb inner flight.
                Alexandra is a modern spiritualist, whose poetic style and innovative computer art empower uplift and
                inspire along the path of spiritual & personal growth.
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
                Each book offers a unique "inner flying" along this path of spiritual discovery and personal
                transformation.
              </p>
              <Link href="/flying">
                <Button variant="outline" className="border-gray-800 text-gray-800 hover:bg-gray-200 rounded-full px-6">
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

          {/* Dynamic book grid with limit of 3 books */}
          <BookGrid limit={3} />
        </section>

        <section className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
            <h2 className="text-3xl font-black mb-8 text-center text-gray-800">The Flying Series</h2>

            {/* Dynamic book grid filtered to "The Flying" series */}
            <BookGrid series="The Flying" />
          </div>
        </section>
      </div>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-800 hover:text-gray-600 relative group transition-all duration-300 font-medium"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

