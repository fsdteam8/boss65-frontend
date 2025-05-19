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
    <section className="container mx-auto py-[60px] md:py-[100px] lg:py-[150px]">
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-semibol font-poppins text-center tracking-[0%] text-[#FF6900] mb-10 md:mb-12 lg:pb-[60px]">
        Join the Social Side
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[45px] lg:gap-[60px]">
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
            <h3 className="font-manrope text-white text-lg font-bold leading-[120%] tracking-[0%] pl-4 md:pl-6 lg:pl-8 ">Albert Flores</h3>
            <p className="text-sm font-normal font-manrope leading-[120%] text-[#D4D4D8] pt-[5px] pl-4 md:pl-6 lg:pl-8 pb-4 md:pb-6 lg:pb-8">Founder of GearUp</p>
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
            <h3 className="font-manrope text-white text-lg font-bold leading-[120%] tracking-[0%] pl-4 md:pl-6 lg:pl-8 ">Leslie Alexander</h3>
            <p className="text-sm font-normal font-manrope leading-[120%] text-[#D4D4D8] pt-[5px] pl-4 md:pl-6 lg:pl-8 pb-4 md:pb-6 lg:pb-8">Co-Founder of Womenia</p>
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
            <h3 className="font-manrope text-white text-lg font-bold leading-[120%] tracking-[0%] pl-4 md:pl-6 lg:pl-8 ">Courtney Henry</h3>
            <p className="text-sm font-normal font-manrope leading-[120%] text-[#D4D4D8] pt-[5px] pl-4 md:pl-6 lg:pl-8 pb-4 md:pb-6 lg:pb-8">Founder of CH Beauty</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 md:mt-12 lg:mt-[60px]">
        <a
          href="#reserve"
          className="font-poppins bg-[#FF6B00] hover:bg-[#E05F00] text-white font-medium py-3 md:py-4 px-6 md:px-8 rounded-full leading-[120%] tracking-[0%] transition-colors duration-300"
        >
          Reserve Now
        </a>
      </div>
    </section>
  )
}
