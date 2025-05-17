import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 py-12 overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/img/hero.jpg" alt="Themed room background" fill priority className="object-cover brightness-50" />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* String Lights Effect */}
      {/* <div className="absolute top-0 w-full h-24 z-10 opacity-70">
        <Image src="/lights.png" alt="String lights" fill className="object-contain" />
      </div> */}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          Private Rooms for Unforgettable
          <span className="block text-[#ff6b00]">Experiences</span>
        </h1>

        <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Enjoy a cozy, immersive movie experience with friends, family, or your special someone in our themed rooms.
        </p>

        <Link
          href="/reserve"
          className="inline-flex items-center justify-center bg-[#ff6b00] hover:bg-[#ff5500] text-white font-bold py-3 px-8 rounded-md transition-colors"
        >
          Reserve Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
