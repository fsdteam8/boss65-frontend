import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWork";
import PrivateRoomPromo from "@/components/PrivateRoom";
import ShowRoom from "@/components/ShowRoom";

export default function Home() {
  return (
  <div>
 <Hero/>
 <ShowRoom/>
 <HowItWorks/>
 <PrivateRoomPromo/>
  </div>
  );
}
