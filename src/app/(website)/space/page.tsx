import Faq from "@/components/Faq";
import HeroSection from "@/components/Hero";
import { PrivateEscapeH1 } from "@/components/hero-title";
import HowItWorks from "@/components/HowItWork";
import MovieRoomSection from "@/components/MovieRoomSection";
import Pricing from "@/components/Pricing";
import ReviewCarousel from "@/components/Review";
import Updates from "@/components/ui/Updates";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection heading={<PrivateEscapeH1 />} />
      <MovieRoomSection />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Updates />
      <ReviewCarousel />
    </div>
  );
};

export default page;
