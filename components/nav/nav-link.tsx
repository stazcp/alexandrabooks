import Link from 'next/link'
import type React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
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
