import HeroSection from '@/components/Hero'
import { Contact } from '@/components/hero-title'
import ReviewCarousel from '@/components/Review'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection heading={<Contact/>}/>
      <ReviewCarousel/>
    </div>
  )
}

export default page
