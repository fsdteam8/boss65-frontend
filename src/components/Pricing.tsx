"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("hourly")

  return (
    <section className="w-full  py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left side content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl text-center font-bold text-orange-500">Pricing</h2>

            {/* Peak and Non-Peak hours info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-center">Non Peak</h3>
                <p className="text-lg text-center italic font-medium">Fri: 11am to 7pm (Exclude PH.)</p>
                <p className="text-lg text-center italic font-medium">
                  Mon - Thurs: 11am to 11pm (Exclude PH & PH eve)
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-xl text-center">Peak</h3>
                <p className="text-lg text-center italic font-medium">Fri & PH eve: 7pm 11pm</p>
                <p className="text-lg text-center italic font-medium">Sat, Sun & PH: 11am to 11pm</p>
              </div>
            </div>

            {/* Tabs for Hourly and Packages */}
            <Tabs defaultValue="hourly" value={activeTab} onValueChange={setActiveTab} className="w-full ">
              <TabsList className="grid grid-cols-2 w-full bg-white">
                <TabsTrigger
                  value="hourly"
                  className={cn("text-black text-xl font-bold", activeTab === "hourly" && "border-b text-red-800 rounded-none   border-orange-500")}
                >
                  Hourly
                </TabsTrigger>
                <TabsTrigger
                  value="packages"
                  className={cn("text-black text-xl  font-medium", activeTab === "packages" && "border-b rounded-none border-orange-500")}
                >
                  Packages Available
                </TabsTrigger>
              </TabsList>

              {/* Hourly rates content */}
              <TabsContent value="hourly" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">Early Bird: $5.90 /pax</h4>
                    <p className="text-lg ">Weekdays (9am - 12pm)</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-medium">Peak: $11.90 /pax</h4>
                    <p className="text-lg ">Friday (6pm – 12am)</p>
                    <p className="text-lg ">Saturday to Sunday (12am – 12am)</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-medium">Non Peak: $9.90 /pax</h4>
                    <p className="text-lg ">Monday to Thursday (12am – 12am)</p>
                    <p className="text-lg ">Friday (12am – 6pm)</p>
                  </div>
                </div>
              </TabsContent>

              {/* Packages content */}
              <TabsContent value="packages" className="space-y-6 mt-6">
                <div className="space-y-4">
               
         

                  <div className="flex items-center justify-between w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-900">Early Bird</h3>
        <div className="flex items-center mt-2 space-x-2">
          <div className="flex items-center justify-center px-2 py-1 text-xs text-white bg-orange-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            "1h"
          </div>
          <div className="flex items-center justify-center px-2 py-1 text-xs text-white bg-orange-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            "1/5"
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-900 bg-yellow-400 rounded-full">
      "$55.90"
      </div>
    </div>
                  
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right side image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[732px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[882px]">
              <Image
                src="/img/pricing.png"
                alt="The Social Chamber"
                fill
                className="object-cover rounded-[16px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 732px"
                priority
              />
            </div>
          </div>
        </div>



        {/* Reserve Now button */}
        <div className="flex justify-center mt-8">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
            Reserve Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
