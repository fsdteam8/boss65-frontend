"use client";
// import { updatesAllData } from "@/components/data/updates-all-data";
import UpdateCart from "@/components/ui/UpdateCart";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UpdatesComponent = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkNTQ5MTM4NzIyMmVkOGRhNTQzMWQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDc4MDE0NTIsImV4cCI6MTc0ODQwNjI1Mn0.tWBXmO_utopfRLG7dIhhpgIsTErqA7fr_Oe_H2-6UEI";

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms/blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
  });

  return (
    <div>
      <div className="container mx-auto pt-[40px] md:pt-[70px] lg:pt-[100px]">
        <h2 className="font-poppins text-[32px] md:text-[40px] lg:text-[48px] text-[#FF6900] leading-[120%] tracking-[0%] text-center font-semibold pb-[20px] md:pb-[30px] lg:pb-[40px]">
          Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {data?.data?.map((update: any) => {
            return <UpdateCart key={update._id} update={update} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UpdatesComponent;
