import HeroSection from '@/components/Hero'
import { Contact } from '@/components/hero-title'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection heading={<Contact/>}/>
    </div>
  )
}

export default page
