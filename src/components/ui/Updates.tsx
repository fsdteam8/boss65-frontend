"use client";
import React from "react";
import UpdateCart from "./UpdateCart";
import { useQuery } from "@tanstack/react-query";

const Updates = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkNTQ5MTM4NzIyMmVkOGRhNTQzMWQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDc4MDE0NTIsImV4cCI6MTc0ODQwNjI1Mn0.tWBXmO_utopfRLG7dIhhpgIsTErqA7fr_Oe_H2-6UEI";

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/cms`,
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
  const blogs = data?.data || [];
  return (
    <div>
      <div className="container mx-auto">
        <h2 className="font-poppins text-[32px] md:text-[40px] lg:text-[48px] text-[#FF6900] leading-[120%] tracking-[0%] text-center font-semibold pb-[30px] md:pb-[45px] lg:pb-[60px]">
          Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {blogs &&
            blogs?.map((update: any) => {
              return <UpdateCart key={update.id} update={update} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Updates;
