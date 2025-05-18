"use client";

import "@/app/globals.css";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { updatesAllData } from "@/components/data/updates-all-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};

const UpdatesSlider = () => {
  return (
    <div className="container mx-auto pb-[40px] md:pb-[70px] lg:pb-[100px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={breakpoints}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg"
      >
        {updatesAllData?.map((update) => (
          <SwiperSlide key={update.id} className="w-full pb-16">
            <Image
              src={update.img}
              alt={update.title || "Update Image"}
              width={354}
              height={300}
              className="w-full h-[300px] object-cover rounded-t-[8px]"
            />
            <div className="pt-[16px] md:pt-[21px] lg:pt-[26px]">
              <h4 className="text-base font-semibold text-[#2A2A2A] leading-[120%]">
                {update.title}
              </h4>
              <p className="text-base font-medium text-[#5A5A5A] leading-[120%] pt-2">
                {update.desc}
              </p>
              <div className="pt-3 md:pt-4">
                <Link href={`/updates/${update.id}`} passHref>
                  <button
                    className="w-full flex items-center justify-between text-lg font-medium text-[#FF6900]"
                    aria-label={`Read more about ${update.title}`}
                  >
                    Explore Blog <ArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpdatesSlider;
