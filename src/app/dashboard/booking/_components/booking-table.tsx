"use client";

import type { Booking, BookingStatus } from "@/types/booking";
import { Button } from "@/components/ui/button";
import EmailSendingModal from "@/components/ui/email-sending-modal";
import { Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React from "react";

interface BookingTableProps {
  bookings?: Booking[];
  updateBookingStatus: (
    id: string,
    index: number,
    status: BookingStatus
  ) => void;
}
// Define dynamic styles for booking status
const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
  // refunded: "bg-yellow-100 text-yellow-700 border-yellow-300",
  pending: "bg-gray-100 text-gray-700 border-gray-300",
};

export function BookingTable() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      return res.json();
    },
  });

  if (isLoading) {
    return <p className="text-center p-5">Please wite...</p>;
  }

  const bookingData = data?.data || [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-3 text-sm font-medium text-gray-500">ID</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Name
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Room ID
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500 text-center">
              People
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Service ID
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Date & Time
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Amount
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bookingData?.map((booking: Booking, index: number) => {
            const status = booking?.status;
            const badgeClass =
              statusStyles[status] ??
              "bg-gray-100 text-gray-700 border-gray-300";

            return (
              <tr key={index} className="border-b">
                <td className="px-4 py-4 text-sm">
                  {booking?._id?.slice(0, 6)}...
                </td>
                <td className="px-4 py-4 text-sm">
                  {booking?.user?.firstName} {booking?.user?.lastName}
                </td>
                <td className="px-4 py-4 text-sm">{booking?.room}</td>
                <td className="px-4 py-4 text-sm text-center">
                  {booking?.user?.numberOfPeople}
                </td>
                <td className="px-4 py-4 text-sm">{booking?.service}</td>
                <td className="px-4 py-4 text-sm">
                  {format(new Date(booking?.date), "yyyy-MM-dd")}
                  <div className="mt-1 space-y-1">
                    {booking?.timeSlots?.map((slot, i) => (
                      <div key={i} className="text-xs text-gray-600">
                        {slot?.start} - {slot?.end}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">
                  ${booking?.total?.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium border rounded-full capitalize ${badgeClass}`}
                  >
                    {status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  <EmailSendingModal
                    recipientEmail={booking?.user?.email}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Send email</span>
                      </Button>
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
