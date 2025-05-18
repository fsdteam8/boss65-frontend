"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function RoomGallery() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const galleryItems = [
  
    {
      id: 1,
      title: "1. Private Movie Room Experience",
      image:
        "/img/exp1.png",
      alt: "Couple enjoying movie night with drinks and popcorn",
    },
    {
        id: 2,
        title: "2. HUGE place for group gathering",
        image:
          "/img/exp2.png",
        alt: "Group of friends in a themed room with decorative banners",
      },
    {
      id: 3,
      title: "3. A Private Space Made Just for You and Your Loved One",
      image:
        "/img/exp3.png",
      alt: "Couple sharing a moment in a cozy living room",
    },
  ]

  return (
    <div className="w-full">
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
      {galleryItems.map((item) => (
        <div key={item.id} className={`w-full ${item.id === 1 || item.id === 3 ? "bg-gray-100" : ""}`}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
            <h2 className="text-xl md:text-2xl font-medium text-orange-500 mb-4">{item.title}</h2>
            <div className="relative w-full overflow-hidden rounded-lg md:rounded-xl">
              <div className="w-full aspect-[16/9] md:aspect-[16/9] lg:aspect-auto relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  fill={isMobile || isTablet}
                  width={isMobile || isTablet ? undefined : 1288}
                  height={isMobile || isTablet ? undefined : 718}
                  className={`object-cover ${isMobile || isTablet ? "object-center" : ""} rounded-lg md:rounded-xl`}
                  priority={item.id === 2} // Prioritize loading the first visible image
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-base md:text-lg font-medium">No CCTV, No Disturbance!</p>
              <p className="text-base md:text-lg">Create COZY moments together with your friends/date.</p>
              <p className="text-base md:text-lg">A truly private immersive cinematic room</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
