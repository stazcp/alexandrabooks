import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BookDetail from "@/app/components/book-detail"

interface BookPageProps {
  params: {
    asin: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  const { asin } = params

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

        <section className="max-w-5xl mx-auto mb-16">
          <BookDetail asin={asin} />
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

