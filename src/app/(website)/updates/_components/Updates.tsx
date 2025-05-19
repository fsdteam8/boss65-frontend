import { updatesAllData } from "@/components/data/updates-all-data";
import UpdateCart from "@/components/ui/UpdateCart";
import React from "react";


const UpdatesComponent = () => {
  return (
    <div>
      <div className="container mx-auto pt-[40px] md:pt-[70px] lg:pt-[100px]">
        <h2 className="font-poppins text-[32px] md:text-[40px] lg:text-[48px] text-[#FF6900] leading-[120%] tracking-[0%] text-center font-semibold pb-[20px] md:pb-[30px] lg:pb-[40px]">
          Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {updatesAllData?.slice(0, 8)?.map((update) => {
            return <UpdateCart key={update.id} update={update} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UpdatesComponent;
