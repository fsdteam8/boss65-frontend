"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Mail, Phone } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data submitted:", formData)
    // You can add additional logic here like form validation or API calls
  }

  return (
    <section className="w-full max-w-5xl  mx-auto px-4 py-16">
      <div className="grid  md:grid-cols-2 gap-8 rounded-lg overflow-hidden ">
        {/* Left side - Contact Information */}
        <div className=" p-8 relative max-w-md border border-gray-200 rounded-lg overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-orange-500 mb-2">Contact Information</h2>
            <p className="text-gray-600 mb-8">Say something to start a live chat!</p>

            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-4 text-gray-700" />
                <span className="text-gray-700">+1 (888) 000-0000</span>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-4 text-gray-700" />
                <span className="text-gray-700">info@abc223.com</span>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-4 mt-1 text-gray-700" />
                <span className="text-gray-700">
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
        <div className="bg-white p-5  border border-gray-200 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Text......"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
  )
}
