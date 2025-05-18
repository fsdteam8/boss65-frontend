"use client"

import { useState, useEffect, useRef } from "react"

export default function SocialSide() {
  const [isMobile, setIsMobile] = useState(false)
  const videoRef1 = useRef<HTMLVideoElement>(null)
  const videoRef2 = useRef<HTMLVideoElement>(null)
  const videoRef3 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Function to check if the viewport is mobile-sized
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Ensure videos load properly on desktop only
    if (!isMobile) {
      ;[videoRef1, videoRef2, videoRef3].forEach((ref) => {
        if (ref.current) {
          ref.current.load()
        }
      })
    }

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [isMobile])

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#FF6B00] mb-10 md:mb-16">
        Join the Social Side
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
        {/* Card 1 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[500px] md:h-[600px] lg:h-[650px]">
          {isMobile ? (
            <div className="w-full h-full">
               <video
                  ref={videoRef1}
                  className="w-full h-full object-cover"
                  width={456}
                  height={707}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/img/hv1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="w-[456px] h-[707px] rounded-[20px] overflow-hidden">
                <video
                  ref={videoRef1}
                  className="w-full h-full object-cover"
                  width={456}
                  height={707}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/img/hv1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-semibold">Albert Flores</h3>
            <p className="text-white/80 text-sm">Founder of GearUp</p>
          </div>
        </div>

        {/* Card 2 - Video card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[500px] md:h-[600px] lg:h-[650px]">
          {isMobile ? (
            <div className="w-full h-full">
                  <video
                  ref={videoRef2}
                  className="w-full h-full object-cover"
                  width={456}
                  height={707}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/img/hv2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="w-[456px] h-[707px] rounded-[20px] overflow-hidden">
                <video
                  ref={videoRef2}
                  className="w-full h-full object-cover"
                  width={456}
                  height={707}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/img/hv2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-semibold">Leslie Alexander</h3>
            <p className="text-white/80 text-sm">Co-Founder of Womenia</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[500px] md:h-[600px] lg:h-[650px]">
          {isMobile ? (
            <div className="w-full h-full">
                 <video
                  ref={videoRef3}
                  className="w-full h-full object-cover"
                  width={456}
                  height={707}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/img/hv3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="w-[456px] h-[707px] rounded-[20px] overflow-hidden">
                <video
                  ref={videoRef3}
                  className="w-full h-full object-cover"
                  width={456}
                  height={707}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/img/hv3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-semibold">Courtney Henry</h3>
            <p className="text-white/80 text-sm">Founder of CH Beauty</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <a
          href="#reserve"
          className="bg-[#FF6B00] hover:bg-[#E05F00] text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
        >
          Reserve Now
        </a>
      </div>
    </section>
  )
}
