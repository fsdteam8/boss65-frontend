import HeroSection from '@/components/Hero'
import { PrivateEscapeH1 } from '@/components/hero-title'
import MovieRoomSection from '@/components/MovieRoomSection'
import React from 'react'

const page = () => {
  return (
    <div>
<HeroSection heading={<PrivateEscapeH1 />}/>
    <MovieRoomSection/>
    </div>
  )
}

export default page
