import AsSeen from "@/components/AsSeen";
import HeroSection from "@/components/Hero";
import PrivateRoomH1 from "@/components/hero-title";
import HowItWorks from "@/components/HowItWork";
import PrivateRoomPromo from "@/components/PrivateRoom";
import ReviewCarousel from "@/components/Review";
import ShowRoom from "@/components/ShowRoom";
import SocialSide from "@/components/SocialSide";

export default function Home() {
  return (
  <div>
 <HeroSection heading={<PrivateRoomH1 />} />
 <ShowRoom/>
 <HowItWorks/>
 <PrivateRoomPromo/>
 <SocialSide/>
 <AsSeen/>
 <ReviewCarousel/>
  </div>
  );
}
