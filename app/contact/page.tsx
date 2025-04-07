import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Send } from 'lucide-react'
import { Navigation } from '@/components/nav/navigation'

export default function ContactPage() {
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
            CONTACT
          </h1>
          <div className="w-24 h-1 bg-gray-800 rounded-full mb-6"></div>
        </header>

        <section className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg doodle-border">
            <div className="p-8 md:p-12 relative">
              <h2 className="text-2xl font-black flex items-center mb-6 text-gray-800">
                <Mail className="mr-3 h-6 w-6 text-gray-800" />
                Get in Touch
              </h2>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                For inquiries about Alexandra's books, speaking engagements, or any other questions,
                please fill out the form below:
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 book-shadow"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 book-shadow"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 book-shadow"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 book-shadow"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white border-none shadow-lg px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 book-shadow w-full md:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
