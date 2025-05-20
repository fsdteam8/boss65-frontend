import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  heading: ReactNode;
}
export default function HeroSection({ heading }: Props) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 py-12 overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero.jpg"
          alt="Themed room background"
          fill
          priority
          className="object-cover brightness-50"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pt-16">
        {heading}

        {/* <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Enjoy a cozy, immersive movie experience with friends, family, or your special someone in our themed rooms.
        </p>  */}

        <Link
          href="/booking"
          className="inline-flex items-center justify-center bg-[#FF6900] hover:bg-[#ff5500] text-white text-base font-medium py-3 md:py-3 px-6 md:px-6 rounded-[8px] transition-colors"
        >
          Reserve Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
