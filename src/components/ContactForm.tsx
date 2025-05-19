"use client";

import type React from "react";

import { useState } from "react";
import { MapPin, Mail, PhoneCall } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can add additional logic here like form validation or API calls
  };

  return (
    <section className="container  mx-auto pt-[40px] md:pt-[70px] lg:pt-[100px]">
      <div className="flex flex-col md:flex-row gap-[23px] rounded-lg overflow-hidden ">
        {/* Left side - Contact Information */}
        <div className="py-6 md:py-8 px-4 md:px-6 relative w-full md:max-w-[529px] border border-black/10 rounded-lg overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-poppins leading-[120%] tracking-[0%] font-semibold text-[#FF6900] mb-2 md:mb-[10px]">
              Contact Information
            </h2>
            <p className="text-[#595959] text-base font-poppins leading-[120%] tracking-[0%]">
              Say something to start a live chat!
            </p>

            <div className="space-y-6 md:space-y-7 lg:space-y-[30px] mt-10 md:mt-16 lg:mt-[120px]">
              <div className="flex items-center gap-5 md:gap-[25px]">
                <PhoneCall className="w-6 h-6" />
                <span className="text-sm font-normal font-poppins leading-[120%] tracking-[0%] text-black">
                  +1 (888) 000-0000
                </span>
              </div>

              <div className="flex items-center gap-5 md:gap-[25px]">
                <Mail className="w-6 h-6" />
                <span className="text-sm font-normal font-poppins leading-[120%] tracking-[0%] text-black">
                  info@abc223.com
                </span>
              </div>

              <div className="flex items-start gap-5 md:gap-[25px]">
                <MapPin className="w-6 h-6" />
                <span className="text-sm font-normal font-poppins leading-[120%] tracking-[0%] text-black">
                  00000 Artesia Blvd., Suite A-000. Cerritos,
                  <br />
                  CA 00000-0000
                </span>
              </div>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 rounded-full opacity-50 -mr-20 -mb-20"></div>
        </div>

        {/* Right side - Contact Form */}
        <div className="w-full md:w-[500px] lg:w-[732px] bg-white p-5 border border-black/10 rounded-lg ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-black/10 text-[#2A2A2A] font-normal leading-[120%] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Text......"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
