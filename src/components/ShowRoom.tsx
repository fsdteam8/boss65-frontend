import Image from "next/image"

export default function ShowRoom() {
  return (
    <section className="w-full py-[60px] md:py-[100px] lg:py-[160px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="rounded-[8px] overflow-hidden">
            <Image
              src="/img/img1.png"
              alt="People relaxing on a couch"
              width={354}
              height={270}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
          <div className="rounded-[8px] overflow-hidden">
            <Image
              src="/img/img2.png"
              alt="People watching TV together"
              width={354}
              height={270}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
          <div className="rounded-[8px] overflow-hidden">
            <Image
              src="/img/img3.png"
              alt="People by a window"
              width={354}
              height={270}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
          <div className="rounded-[8px] overflow-hidden">
            <Image
              src="/img/img4.png"
              alt="People at a table"
              width={354}
              height={270}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
