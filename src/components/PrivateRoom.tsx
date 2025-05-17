import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PrivateRoomPromo() {
  return (
    <section className="w-full bg-[#FDB913] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image container - takes full width on mobile, half on larger screens */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[605px] lg:h-[315px]">
              <Image
                src="/img/img6.png"
                alt="Person stretching in a cozy room"
                width={605}
                height={315}
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 605px"
              />
            </div>
          </div>

          {/* Content container */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#333]">
              Your Private Room. Your Experience. Anytime.
            </h2>

            <p className="text-base md:text-lg mb-6 text-[#333] max-w-lg">
              Unwind, connect, and celebrate in curated spaces for every mood — open 24/7 in the heart of Singapore.
            </p>

            <Button className="bg-white hover:bg-gray-100 text-[#FDB913] border-2 border-white hover:border-gray-100 rounded-full px-8 py-2 font-medium text-base">
              Reserve Your Experience Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
