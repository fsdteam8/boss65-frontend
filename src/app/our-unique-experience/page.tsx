import HeroSection from '@/components/Hero'
import { Experience, PrivateEscapeH1 } from '@/components/hero-title'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection heading={<Experience />}/>
    </div>
  )
}

export default page
