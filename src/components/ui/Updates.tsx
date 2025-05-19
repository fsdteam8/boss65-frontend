import React from "react";
import { updatesAllData } from "../data/updates-all-data";
import UpdateCart from "./UpdateCart";

const Updates = () => {
  return (
    <div>
      <div className="container mx-auto">
        <h2 className="font-poppins text-[32px] md:text-[40px] lg:text-[48px] text-[#FF6900] leading-[120%] tracking-[0%] text-center font-semibold pb-[30px] md:pb-[45px] lg:pb-[60px]">
          Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {updatesAllData?.slice(0, 4)?.map((update) => {
            return <UpdateCart key={update.id} update={update} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Updates;
