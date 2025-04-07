import type React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'
import { Navigation } from '@/components/nav/navigation'

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] text-gray-800 pattern-bg">
      <div className="container mx-auto px-4 py-6 relative z-10">
        <Navigation />

        <Link
          href="/"
          className="inline-flex items-center text-gray-800 hover:text-gray-600 mb-8 group transition-all duration-300 font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <header className="flex flex-col items-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 text-center tracking-tight">
            REVIEWS
          </h1>
          <div className="w-24 h-1 bg-gray-800 rounded-full mb-6"></div>
        </header>

        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg doodle-border">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed text-center">
              Discover what readers and critics are saying about Alexandra Psaropoulou's
              transformative works.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            <ReviewCard
              source="Literary Review"
              rating={5}
              quote="Alexandra's visual poems take the reader on a superb inner flight. Her innovative approach to combining poetry with visual art creates a unique experience that resonates deeply with readers seeking spiritual growth."
              className="float-animation"
            />

            <ReviewCard
              source="Poetry Magazine"
              rating={5}
              quote="The Flying series represents a breakthrough in modern spiritualist poetry. Alexandra Psaropoulou's poetic style and computer art empower and inspire readers along their own path of personal growth."
              className="float-animation float-animation-delay-1"
            />

            <ReviewCard
              source="Art & Literature Journal"
              rating={4}
              quote="Each book in the Flying collection offers a unique 'inner flying' experience. The colorful and unique graphic designs complement the poetry beautifully, creating a harmonious blend of visual and written art."
            />

            <ReviewCard
              source="Spiritual Arts Quarterly"
              rating={5}
              quote="Alexandra Psaropoulou has created something truly unique with her Flying series. The books transcend traditional poetry, offering readers a multi-sensory experience that opens doorways to deeper understanding and self-awareness."
              className="float-animation float-animation-delay-2"
            />

            <ReviewCard
              source="Modern Poetry Review"
              rating={5}
              quote="In a world of conventional poetry collections, Alexandra's work stands apart as a beacon of innovation and spiritual depth. Her visual poems don't just communicate ideas—they transform consciousness."
              className="float-animation float-animation-delay-3"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

function ReviewCard({
  source,
  rating,
  quote,
  className = '',
}: {
  source: string
  rating: number
  quote: string
  className?: string
}) {
  return (
    <div className={`group ${className}`}>
      <div className="relative">
        <div className="relative bg-white p-8 rounded-xl shadow-md transition-all duration-300 book-card">
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-500 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-800">{source}</span>
          </div>

          <blockquote className="text-gray-700 italic leading-relaxed border-l-4 border-gray-800 pl-4">
            "{quote}"
          </blockquote>
        </div>
      </div>
    </div>
  )
}
