import HeroSection from '@/components/Hero'
import { PrivateEscapeH1 } from '@/components/hero-title'
import HowItWorks from '@/components/HowItWork'
import MovieRoomSection from '@/components/MovieRoomSection'
import Pricing from '@/components/Pricing'
import React from 'react'

const page = () => {
  return (
    <div>
<HeroSection heading={<PrivateEscapeH1 />}/>
    <MovieRoomSection/>
    <HowItWorks/>
    <Pricing/>
    </div>
  )
}

export default page
