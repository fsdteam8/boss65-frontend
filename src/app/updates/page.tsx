import HeroSection from "@/components/Hero";
import { Stay } from "@/components/hero-title";
import React from "react";
import UpdatesComponent from "./_components/Updates";

const page = () => {
  return (
    <div>
      <HeroSection heading={<Stay />} />
      <UpdatesComponent/>
    </div>
  );
};

export default page;
