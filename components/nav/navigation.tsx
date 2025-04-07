import Image from 'next/image'
import { NavLink } from './nav-link'

export function Navigation() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Alexandra Books Logo"
            width={120}
            height={50}
            className="h-auto"
          />
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
          <NavLink href="/other-books">Other</NavLink>
          <NavLink href="/reviews">Reviews</NavLink>
          <NavLink href="/bio">Bio</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </nav>
    </>
  )
}
