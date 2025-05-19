"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("hourly");

  return (
    <section className="w-full pt-[40px] md:pt-[70px] lg:pt-[100px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left side content */}
          <div className="w-full lg:w-1/2">
            <h2 className="w-[444px] text-2xl md:text-3xl lg:text-[32px] leading-[120%] tracking-[120%] text-center font-semibold text-[#FF6900] font-poppins pb-4 md:pb-7 lg:pb-10">
              Pricing
            </h2>

            {/* Peak and Non-Peak hours info */}
            <div className="w-full md:w-[444px] pb-[30px] md:pb-[50px] lg:pb-[70px]">
              <div className="pb-4 md:pb-6 lg:pb-8">
                <h3 className="font-semibold text-xl text-center leading-[120%] tracking-[0%] font-poppins pb-2 md:pb-3 lg:pb-4">
                  Non Peak
                </h3>
                <p className="text-lg text-center italic font-medium leading-[120%] tracking-[0%] text-black font-poppins">
                  Fri: 11am to 7pm (Exclude PH.)
                </p>
                <p className="text-lg text-center italic font-medium leading-[120%] tracking-[0%] text-black pt-2 font-poppins">
                  Mon - Thurs: 11am to 11pm (Exclude PH & PH eve)
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-center leading-[120%] tracking-[0%] font-poppins pb-2 md:pb-3 lg:pb-4">
                  Peak
                </h3>
                <p className="text-lg text-center italic font-medium leading-[120%] tracking-[0%] text-black font-poppins">
                  Fri & PH eve: 7pm 11pm
                </p>
                <p className="text-lg text-center italic font-medium leading-[120%] tracking-[0%] text-black pt-2 font-poppins">
                  Sat, Sun & PH: 11am to 11pm
                </p>
              </div>
            </div>

            {/* Tabs for Hourly and Packages */}
            <Tabs
              defaultValue="hourly"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full "
            >
              <TabsList className="grid grid-cols-2 w-full bg-white">
                <TabsTrigger
                  value="hourly"
                  className={cn(
                    "font-poppins text-xl font-bold shadow-none",
                    activeTab === "hourly"
                      ? "text-[#D95900] border-b-[2px]  border-[#D95900]"
                      : "text-black"
                  )}
                >
                  Hourly
                </TabsTrigger>
                <TabsTrigger
                  value="packages"
                  className={cn(
                    "font-poppins text-xl  font-medium",
                    activeTab === "packages"
                      ? "text-[#D95900] border-b-[2px]  border-[#D95900]"
                      : "text-black"
                  )}
                >
                  Packages Available
                </TabsTrigger>
              </TabsList>

              {/* Hourly rates content */}
              <TabsContent
                value="hourly"
                className="pt-[25px] md:pt-[32px] lg:pt-[40px]"
              >
                <div className="">
                  <div className="">
                    <h4 className="font-poppins text-lg md:text-xl leading-[120%] tracking-[0%] text-black">
                      <span className="font-semibold">Early Bird: $5.90</span>{" "}
                      /pax
                    </h4>
                    <p className="text-lg md:text-xl font-normal font-poppins leading-[120%] pt-2 md:pt-3 tracking-[0%]">
                      Weekdays (9am - 12pm)
                    </p>
                  </div>

                  <div className="py-[20px] md:py-[26px] lg:py-[32px]">
                    <h4 className="font-poppins text-lg md:text-xl leading-[120%] tracking-[0%] text-black">
                      Peak: $11.90{" "}
                      <span className="font-semibold">Early Bird: $5.90</span>
                    </h4>
                    <p className="py-[10px] md:py-[13px] lg:py-[15px] text-lg md:text-xl font-normal font-poppins leading-[120%] tracking-[0%]">
                      Friday (6pm – 12am)
                    </p>
                    <p className="text-lg md:text-xl font-normal font-poppins leading-[120%] tracking-[0%]">
                      Saturday to Sunday (12am – 12am)
                    </p>
                  </div>

                  <div className="">
                    <h4 className="font-poppins text-lg md:text-xl leading-[120%] tracking-[0%] text-black">
                      Non Peak: $9.90{" "}
                      <span className="font-semibold">Early Bird: $5.90</span>
                    </h4>
                    <p className="py-[10px] md:py-[13px] lg:py-[15px] text-lg md:text-xl font-normal font-poppins leading-[120%] tracking-[0%]">
                      Monday to Thursday (12am – 12am)
                    </p>
                    <p className="text-lg md:text-xl font-normal font-poppins leading-[120%] tracking-[0%]">
                      Friday (12am – 6pm)
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Packages content */}
              <TabsContent value="packages" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900">
                        Early Bird
                      </h3>
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
                          &ldquo;1h&ldquo;
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
                          &ldquo;1/5&ldquo;{" "}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-900 bg-yellow-400 rounded-full">
                      &ldquo;$55.90&ldquo;
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right side image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[732px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[882px]">
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
        <div className="flex justify-center mt-8 md:mt-[45px] lg:mt-[70px]">
          <Link href="/reserve">
            <button className="inline-flex items-center justify-center bg-[#FF6900] hover:bg-[#ff5500] text-white text-base font-medium py-3 md:py-4 px-6 md:px-8 rounded-[8px] transition-colors">
              Reserve Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
