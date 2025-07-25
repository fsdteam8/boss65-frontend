"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  bookingId: string;
}
export default function BookingConfirmation({ bookingId }: Props) {
  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/booking/${bookingId}`,
        {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return res.json();
    },
  });

  const successData = data?.data || [];
   // console.log(successData);

  return (
    <div className="my-32">
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardContent className="pt-6 px-6 pb-0">
          <div className="flex flex-col items-center mb-6">
            <div className="rounded-full bg-orange-500 p-2 mb-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-center">Thank You!</h2>
            <p className="text-center text-sm text-orange-500 mt-1">
              Your reservation is confirmed, get ready for a private experience
              crafted just for you. Check your email for all the details
            </p>
          </div>

          <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Booking ID :</span>
              <span className="text-gray-600">{successData._id}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Name :</span>
              <span className="text-gray-600">
                {successData?.user?.firstName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Email :</span>
              <span className="text-gray-600">{successData?.user?.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Phone :</span>
              <span className="text-gray-600">{successData?.user?.phone}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Category :</span>
              <span className="text-gray-600">
                {successData?.service?.category?.name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Rooms :</span>
              <span className="text-gray-600">{successData?.room?.title}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Services :</span>
              <span className="text-gray-600">Early Bird</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Time :</span>
              <span className="text-gray-600">
                {new Date(successData?.createdAt)
                  .toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", " -")}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4">
          <Link href={"/"}>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Go to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
