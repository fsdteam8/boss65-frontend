import Faq from '@/components/Faq'
import HeroSection from '@/components/Hero'
import { Experience, PrivateEscapeH1 } from '@/components/hero-title'
import ReviewCarousel from '@/components/Review'
import RoomGallery from '@/components/RoomGallery'
import SocialChamber from '@/components/SocialChamber'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection heading={<Experience />}/>
      <SocialChamber/>
      <RoomGallery/>
      <Faq/>
      <ReviewCarousel/>
    </div>
  )
}

export default page
