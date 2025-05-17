import Image from "next/image"

export default function AsSeen() {
  const logos = [
    {
      src: "/img/aso1.png",
      alt: "MyGuide Singapore",
      width: 200,
      height: 80,
    },
    {
      src: "/img/aso2.png",
      alt: "Confirm Good",
      width: 200,
      height: 80,
    },
    {
      src: "/img/aso3.png",
      alt: "The Vent Machine",
      width: 200,
      height: 80,
    },
    {
      src: "/img/aso4.png",
      alt: "Money FM 89.3",
      width: 200,
      height: 80,
    },
    {
      src: "/img/aso5.png",
      alt: "House Search Icon",
      width: 200,
      height: 80,
    },
    {
      src: "/img/aso6.png",
      alt: "Great New Places",
      width: 200,
      height: 80,
    },
  ]

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#FF6B00] mb-12">As Seen On</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12  h-[400px]">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative h-16 sm:h-20 w-full">
                <Image
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
