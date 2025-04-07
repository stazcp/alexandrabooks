import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BioPage() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] text-gray-800 pattern-bg">
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
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 text-center tracking-tight">BIOGRAPHY</h1>
          <div className="w-24 h-1 bg-gray-800 rounded-full mb-6"></div>
        </header>

        <section className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg doodle-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 relative">
              <div className="md:col-span-1">
                <div className="relative group">
                  <div className="relative book-shadow rounded-lg">
                    <Image
                      src="/images/alexandra-portrait.jpg"
                      alt="Alexandra Psaropoulou"
                      width={300}
                      height={400}
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-3xl font-black text-gray-800 mb-6">Alexandra Psaropoulou</h2>

                <div className="prose prose-gray max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Alexandra Psaropoulou is a modern spiritualist poet and visual artist whose work combines innovative
                    computer art with profound poetic expression. Her unique approach to poetry takes readers on what
                    she describes as an "inner flight" - a journey of spiritual and personal growth.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Born with a passion for both visual arts and written expression, Alexandra developed her distinctive
                    style by merging colorful, unique graphic designs with poetry that explores themes of spirituality,
                    self-discovery, and personal transformation.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Her most notable work, "The Flying Series," has received acclaim for its ability to empower, uplift,
                    and inspire readers along their own paths of spiritual development. Each book in the series offers a
                    unique perspective on the inner journey, guided by Alexandra's artistic vision and spiritual
                    insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
            <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">Artistic Journey</h2>

            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Early Influences</h3>
                <p className="text-gray-700">
                  Alexandra's artistic journey began with an exploration of traditional poetry and visual arts, which
                  later evolved into her signature style of combining digital art with poetic expression.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Spiritual Awakening</h3>
                <p className="text-gray-700">
                  A profound spiritual experience led Alexandra to develop her concept of "inner flying" - a metaphor
                  for the journey of self-discovery and spiritual growth that became central to her work.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">The Flying Series</h3>
                <p className="text-gray-700">
                  The creation of The Flying Series marked a significant milestone in Alexandra's career, establishing
                  her as a pioneering voice in the realm of spiritual poetry and visual art.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
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

