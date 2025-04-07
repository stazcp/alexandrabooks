import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import BookGrid from "@/app/components/book-grid"

export default function FlyingPage() {
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

        <Link
          href="/"
          className="inline-flex items-center text-gray-800 hover:text-gray-600 mb-8 group transition-all duration-300 font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <header className="flex flex-col items-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 text-center tracking-tight">
            THE FLYING SERIES
          </h1>
          <div className="w-24 h-1 bg-gray-800 rounded-full mb-6"></div>
        </header>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The visual poems, with colourful and unique graphic designs, take the reader on a superb inner flight.
              Alexandra is a modern spiritualist, whose poetic style and innovative computer art empower uplift and
              inspire along the path of spiritual & personal growth.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Each book offers a unique "inner flying" along this path, guiding readers through a journey of
              self-discovery and spiritual awakening.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-16">
          {/* Dynamic book grid filtered to "The Flying" series */}
          <BookGrid series="The Flying" />
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border text-center">
            <h2 className="text-3xl font-black mb-6 text-gray-800">Begin Your Inner Flight</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Experience the transformative power of Alexandra's visual poetry and embark on your own spiritual journey.
            </p>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white border-none shadow-lg px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 book-shadow">
              Purchase Books
            </Button>
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

