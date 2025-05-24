"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import EmailSendingModal from "@/components/ui/email-sending-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { DateRangePicker } from "@/components/ui/date-range-picker";

import type { BookingStatus } from "@/types/booking";
import type { BookingApiResponse } from "@/types/bookingDataType/bookingDataType";

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
  refunded: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export function BookingTable() {
  const [status, setStatus] = useState<string | undefined>();
  // const [startDate, setStartDate] = useState<string>("2025-05-24");
  // const [endDate, setEndDate] = useState<string>("2025-05-30");

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, refetch } = useQuery<BookingApiResponse>({
    queryKey: ["booking", status],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking?status=${status || ""}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    },
    enabled: !!token,
  });

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    setUpdatingId(bookingId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Booking status updated!");
      refetch();
    } catch {
      toast.error("Failed to update booking status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading ...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-[60px]">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <div className="flex items-center gap-10">
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-[180px] bg-white placeholder:text-black text-black/90 font-bold focus:ring-0 border border-black/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>


          {/* <DateRangePicker
            onUpdate={({ range }) => {
              if (range.from) setStartDate(range.from.toISOString().split("T")[0]);
              if (range.to) setEndDate(range.to.toISOString().split("T")[0]);
            }}
            initialDateFrom={startDate}
            initialDateTo={endDate}
            align="start"
            locale="en-GB"
            showCompare={false}
          /> */}


        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-sm font-medium text-gray-500">ID</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Room ID</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500 text-center">People</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Service ID</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Date & Time</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Amount</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.bookings?.map((booking) => {
              const badgeClass =
                statusStyles[booking.status] ??
                "bg-gray-100 text-gray-700 border-gray-300";

              const isUpdating = updatingId === booking._id;

              return (
                <tr key={booking._id} className="border-b">
                  <td className="px-4 py-4 text-sm">{booking._id?.slice(0, 6)}...</td>
                  <td className="px-4 py-4 text-sm">
                    {booking.user?.firstName} {booking.user?.lastName}
                  </td>
                  <td className="px-4 py-4 text-sm">{booking.room?.title}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    {booking.user?.numberOfPeople}
                  </td>
                  <td className="px-4 py-4 text-sm">{booking.service?.name}</td>
                  <td className="px-4 py-4 text-sm">
                    {format(new Date(booking.date), "yyyy-MM-dd")}
                    <div className="mt-1 space-y-1">
                      {booking.timeSlots?.map((slot, i) => (
                        <div key={i} className="text-xs text-gray-600">
                          {slot.start} - {slot.end}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">${booking.total?.toFixed(2)}</td>
                  <td className="px-4 py-4 text-sm">
                    <Select
                      defaultValue={booking.status}
                      disabled={isUpdating}
                      onValueChange={(value) =>
                        updateBookingStatus(booking._id, value as BookingStatus)
                      }
                    >
                      <SelectTrigger className={`w-[130px] h-8 capitalize ${badgeClass} border font-medium`}>
                        <SelectValue placeholder="Change status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <EmailSendingModal
                      recipientEmail={booking.user?.email}
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
    </div>
  );
}
