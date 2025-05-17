import AsSeen from "@/components/AsSeen";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWork";
import PrivateRoomPromo from "@/components/PrivateRoom";
import ReviewCarousel from "@/components/Review";
import ShowRoom from "@/components/ShowRoom";

export default function Home() {
  return (
  <div>
 <Hero/>
 <ShowRoom/>
 <HowItWorks/>
 <PrivateRoomPromo/>
 <AsSeen/>
 <ReviewCarousel/>
  </div>
  );
}
