import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface UpdateCartProps {
  id: number;
  img: string;
  title: string;
  desc: string;
}

const UpdateCart = ({ update }: { update: UpdateCartProps }) => {
  return (
    <div className={`${update.id >= 5 && "mt-4 md:mt-5 lg:mt-6"}`}>
      <Image
        src={update.img}
        alt={update.title}
        width={354}
        height={300}
        className="w-full h-[300px] object-cover rounded-t-[8px]"
      />
      <div className="pt-[16px] md:pt-[21px] lg:pt-[26px] px-[10px]">
        <h4 className="font-poppins text-base font-semibold text-[#2A2A2A] leading-[120%] tracking-[0%]">
          {update.title}
        </h4>
        <p className="font-poppins text-base font-medium text-[#5A5A5A] tracking-[0%] leading-[120%] pt-2">
          {update.desc}
        </p>
        <div className="pt-3 md:pt-4">
          <Link href={`/updates/${update.id}`}>
            <button className="font-poppins w-full flex items-center justify-between text-lg font-medium text-[#FF6900] tracking-[0%] leading-[120%]">
              Explore Blog <ArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateCart;
