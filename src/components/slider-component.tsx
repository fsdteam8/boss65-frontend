"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/img/exp1.png",
      title: "No CCTV, live your real, your Loved One",
      subtitle: "Create CCTV moments together with your loved/friends",
      description: "A fully private immersive cinematic room",
    },
    {
      id: 2,
      image: "/img/exp2.png",
      title: "1. Private Movie Room Experience",
      subtitle: "No CCTV, live Entertainment",
      description:
        "Create CCTV moments together with your loved/friends, A fully private immersive cinematic room",
    },
    {
      id: 3,
      image: "/img/exp3.png",
      title: "2. Invite people for group game",
      subtitle: "No CCTV, live Entertainment",
      description:
        "Create CCTV moments together with your friends, A fully private immersive room",
    },
    {
      id: 4,
      image: "/img/exp1.png",
      title: "3. New Event",
      subtitle: "More privacy, more fun",
      description:
        "Join our latest immersive event and enjoy the moment fully private.",
    },
    {
      id: 5,
      image: "/img/exp2.png",
      title: "4. Enjoy Movie with Friends",
      subtitle: "Cinematic vibes only",
      description:
        "A beautiful cinematic private experience with your favorite people.",
    },
  ];

  const slidesToShow = 3;

  // const nextSlide = () => {
  //   setCurrentSlide((prev) =>
  //     prev + 1 > slides.length - slidesToShow ? 0 : prev + 1
  //   );
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) =>
  //     prev - 1 < 0 ? slides.length - slidesToShow : prev - 1
  //   );
  // };

  // const goToSlide = (index: number) => {
  //   setCurrentSlide(index);
  // };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     nextSlide();
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, [nextSlide]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev + 1 > slides.length - slidesToShow ? 0 : prev + 1
    );
  }, [slides.length, slidesToShow]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev - 1 < 0 ? slides.length - slidesToShow : prev - 1
    );
  }, [slides.length, slidesToShow]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="w-full p-4">
      <div className="relative mb-20">
        <div className="relative overflow-hidden rounded-2xl bg-[#E4E4E4]">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(slides.length / slidesToShow) * 100}%`,
              transform: `translateX(-${(100 / slidesToShow) * currentSlide}%)`,
            }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-1/3 flex-shrink-0 px-2 box-border"
              >
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="p-4 lg:p-6">
                    <div className="relative">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          width={900}
                          height={900}
                          className="w-full h-[200px] lg:h-[600px] object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mt-4">
                        <h2 className="text-xl font-bold text-[#FF6900]">
                          {slide.title}
                        </h2>
                        <p className="text-[#000000] font-medium">
                          {slide.subtitle}
                        </p>
                        <p className="text-[#000000] text-sm">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FF6900] text-white shadow-lg rounded-full w-10 h-10 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FF6900] text-white shadow-lg rounded-full w-10 h-10 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots indicator */}
        {/* <div className="flex justify-center mt-6 space-x-2">
          {Array.from({
            length: slides.length - slidesToShow + 1,
          }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-orange-500 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
