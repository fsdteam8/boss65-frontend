import HeroSection from '@/components/Hero'
import { Stay } from '@/components/hero-title'
import React from 'react'

const page = () => {
  return (
    <div>

        <HeroSection heading={<Stay/>}/>
    </div>
  )
}

export default page