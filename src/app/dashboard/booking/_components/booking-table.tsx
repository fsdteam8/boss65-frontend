"use client";

import type { Booking, BookingStatus } from "@/types/booking";
import { Button } from "@/components/ui/button";
import EmailSendingModal from "@/components/ui/email-sending-modal";
import { Mail } from "lucide-react";
import { BookingStatusCell } from "./booking-status-cell";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface BookingTableProps {
  bookings?: Booking[];
  updateBookingStatus: (
    id: string,
    index: number,
    status: BookingStatus
  ) => void;
}

export function BookingTable({
  bookings = [],
  updateBookingStatus,
}: BookingTableProps) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkNTQ5MTM4NzIyMmVkOGRhNTQzMWQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDc4MDE0NTIsImV4cCI6MTc0ODQwNjI1Mn0.tWBXmO_utopfRLG7dIhhpgIsTErqA7fr_Oe_H2-6UEI";

  const { data } = useQuery({
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

  const bookingData = data?.data || bookings;

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
            <th className="px-4 py-3 text-sm font-medium text-gray-500">
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
          {bookingData?.map((booking: Booking, index: number) => (
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
                <BookingStatusCell
                  status={booking?.status}
                  onStatusChange={(newStatus) =>
                    updateBookingStatus(booking?._id, index, newStatus)
                  }
                />
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
