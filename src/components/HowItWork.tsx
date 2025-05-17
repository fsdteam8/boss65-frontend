import { Clock,  Award, HeartHandshake } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#E05400] text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">How It Works</h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 mt-12">
          {/* Feature 1 - Positioned higher */}
          <div className="flex flex-col w-[353px]   md:items-start  md:text-left md:self-start">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-2xl md:text-3xl  mr-3">01</span>
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">You Can Trust</h3>
            <p className="text-sm md:text-base opacity-90">
              Lorem ipsum dolor sit amet consectetur. Donec blandit nisi elementum sed sed odio.
            </p>
          </div>

          {/* Feature 2 - Positioned lower */}
          <div className="flex flex-col  w-[353px] md:mt-16">
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-2xl md:text-3xl  mr-3">02</span>
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Fast & Reliable</h3>
            <p className="text-sm md:text-base opacity-90">
              Lorem ipsum dolor sit amet consectetur. Donec blandit nisi elementum sed sed odio.
            </p>
          </div>

          {/* Feature 3 - Positioned higher */}
          <div className="flex flex-col  w-[353px]  ">
            <div className="flex  justify-between w-full mb-4">
              <span className="text-2xl md:text-3xl  mr-3">03</span>
              <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Safety and Quality</h3>
            <p className="text-sm md:text-base opacity-90">
              Lorem ipsum dolor sit amet consectetur. Donec blandit nisi elementum sed sed odio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
