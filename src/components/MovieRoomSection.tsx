"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function MovieRoomSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl  md:text-[32px] font-bold text-[#FF6600] mb-4">PRIVATE MOVIE ROOM DATE IDEA</h2>

        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl">
          Looking for a private space to watch movie/series with your date
        </p>

        <Button
          className="bg-[#FF6600] hover:bg-[#E55500] text-white mb-10 px-6 py-2 rounded-md flex items-center gap-2"
          onClick={() => window.open("#pricing", "_self")}
        >
          Click here to view pricing/packages
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor" />
          </svg>
        </Button>

        <div className="w-full max-w-[984px] mx-auto relative rounded-lg overflow-hidden shadow-sm">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-[8px]"
              // poster="/cozy-movie-room.png"
              preload="metadata"
              width={984}
              height={548}
            >
              <source src="/img/movieRoom.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video overlay with controls */}
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-[8px]">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-3 text-start text-[#FF6600] font-medium rounded-b-[8px]">This is the Video Title</div>
        </div>
      </div>
    </section>
  )
}
