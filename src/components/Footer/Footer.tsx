import Link from "next/link"
import { Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black  text-white py-8 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and brand */}
       
            <div className="relative h-14 w-14 md:h-16 md:w-16">
                      <Image src="/img/logo.png" alt="Social Chamber" fill className="object-contain" />
                    </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-0 text-sm md:text-base">
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Couples
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Individual
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Group
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Our Unique Experience
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Updates
            </Link>
            <Link href="#" className="hover:text-[#ff6b00] transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Social icons */}
          <div className="flex gap-4">
            <Link
              href="#"
              className="bg-yellow-400 text-black rounded-full p-2 hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="bg-yellow-400 text-black rounded-full p-2 hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Divider */}
        {/* <div className="border-t border-[#FFCE71] my-4"></div> */}

        {/* Copyright */}
        <div className="text-center text-sm max-w-[1296px] mx-auto text-gray-400 border-t border-[#FFCE71] p-5 my-5">© Copyright 2025, All Rights Reserved by #####</div>
      </div>
    </footer>
  )
}
