'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
  const [year, setYear] = useState('2024')

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="relative z-10 border-t border-gray-300 mt-20 py-8 bg-[#f0f0f0]">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        © {year} Alexandra Books. All rights reserved.
      </div>
    </footer>
  )
}
