import Faq from '@/components/Faq'
import HeroSection from '@/components/Hero'
import { Experience, PrivateEscapeH1 } from '@/components/hero-title'
import ReviewCarousel from '@/components/Review'
import SocialChamber from '@/components/SocialChamber'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection heading={<Experience />}/>
      <SocialChamber/>
      <Faq/>
      <ReviewCarousel/>
    </div>
  )
}

export default page
