"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface Testimonial {
  id: number
  name: string
  quote: string
  image: string
  rating: number
}

export default function ReviewCarousel() { 
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)


  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Devon Lane",
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image:
        "/img/user1.png",
      rating: 5,
    },
    {
      id: 2,
      name: "Devon Lane",
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image:
        "/img/user2.png",
      rating: 5,
    },
    {
      id: 3,
      name: "Alex Johnson",
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image: "/img/user1.png",
      rating: 4,
    },
    {
      id: 4,
      name: "Sarah Williams",
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image: "/img/user2.png",
      rating: 4,
    },
    {
      id: 5,
      name: "Michael Chen",
      quote:
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      image: "/img/user2.png",
      rating: 5,
    },
  ]

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <div className="container mx-auto pt-[40px] md:pt-[70px] lg:pt-[104px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
      <div className="text-center pb-[40px] md:pb-[70px] lg:pb-[99px]">
        <p className="font-poppins text-[#FCB900] text-lg font-semibold leading-[30px] tracking-[-0.22x] pb-[15px] md:pb-[20px] lg:pb-[25px]">3940+ Happy Landingfolio Users</p>
        <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#FF6900] font-semibold font-poppins leading-[67px] tracking-[-2.16px]">Don&apos;t just take our words</h2>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 px-0">
              <Card className="border-none shadow-none">
                <CardContent className=" pr-0">
                  <div className="flex flex-col md:flex-row gap-[15px] md:gap-[25px] lg:gap-[43px] ">
                    <div className="relative overflow-hidden rounded-lg flex-shrink-0 ">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={258}
                        height={258}
                        className="w-full md:w-[258px] h-[258px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[17px] md:text-lg lg:text-xl font-medium font-poppins leading-[30px] tracking-[0%] text-[#090914]">&quot;{testimonial.quote}&quot;</p>
                      <p className="text-base md:text-lg leading-[120%] tracking-[0%] text-[#595959] font-medium pt-4 md:pt-5 lg:pt-[25px]">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8 md:mt-12 lg:mt-[80px]">
          <CarouselPrevious className="relative static mr-2 translate-y-0" />
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === index ? "w-4 bg-orange-500" : "bg-orange-200"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="relative static ml-2 translate-y-0" />
        </div>
      </Carousel>
    </div>
  )
}
