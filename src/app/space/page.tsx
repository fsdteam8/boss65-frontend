import HeroSection from '@/components/Hero'
import { PrivateEscapeH1 } from '@/components/hero-title'
import React from 'react'

const page = () => {
  return (
    <div>
<HeroSection heading={<PrivateEscapeH1 />}/>
    
    </div>
  )
}

export default page
