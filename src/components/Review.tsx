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
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.Our designers were using it for their projects, so we already knew what kind of design they want.",
      image:
        "/img/user2.png",
      rating: 5,
    },
    {
      id: 3,
      name: "Alex Johnson",
      quote:
        "Landingfolio has transformed how we approach design. The templates are not just beautiful but also highly functional.",
      image: "/img/user1.png",
      rating: 4,
    },
    {
      id: 4,
      name: "Sarah Williams",
      quote:
        "As a freelancer, Landingfolio has saved me countless hours. My clients are always impressed with the final results.",
      image: "/img/user2.png",
      rating: 4,
    },
    {
      id: 5,
      name: "Michael Chen",
      quote:
        "The variety of designs available on Landingfolio is impressive. There's something for every industry and style preference.",
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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-orange-500 font-medium mb-2">3840+ Happy Landingfolio Users</p>
        <h2 className="text-4xl font-bold text-orange-500 md:text-5xl">Don&apos;t just take our words</h2>
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
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4 ">
              <Card className="border-none shadow-none">
                <CardContent className="p-6">
                  <div className="flex gap-4 ">
                    <div className="relative h-24 w-24 overflow-hidden rounded-lg flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-2">&quot;{testimonial.quote}&quot;</p>
                      <p className="font-medium text-gray-500">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8">
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
