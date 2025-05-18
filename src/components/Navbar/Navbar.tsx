"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

const landingPages = ["/", "/space", "/our-unique-experience","/contact"]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const ifWhiteColorNav = landingPages.includes(pathname)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/space", label: "Space" },
    { href: "/our-unique-experience", label: "Our Unique Experience" },
    { href: "/updates", label: "Updates" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <header className="absolute top-0 left-0 w-full py-4 px-4 md:px-8 lg:px-12 z-50">
      <div className="flex items-center justify-between container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-14 w-14 md:h-16 md:w-16">
            <Image src="/img/logo.png" alt="Social Chamber" fill className="object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors ${
                pathname === link.href ? "text-[#ff6b00]" : ifWhiteColorNav ? "text-white hover:text-[#ff6b00]" : "hover:text-[#ff6b00] text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Reserve Button */}
        <Link
          href="/reserve"
          className="hidden md:flex items-center justify-center bg-[#ffb800] hover:bg-[#ffa600] text-black font-bold py-2 px-6 rounded-md transition-colors"
        >
          Reserve Now
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0a0a14]/95 backdrop-blur-sm pt-20 px-4">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl font-medium ${
                  pathname === link.href ? "text-[#ff6b00]" : "text-white hover:text-[#ff6b00]"
                }`}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reserve"
              className="flex items-center justify-center bg-[#ffb800] hover:bg-[#ffa600] text-black font-bold py-3 px-6 rounded-md transition-colors mt-4"
              onClick={toggleMenu}
            >
              Reserve Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
