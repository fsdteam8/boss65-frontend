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
import { SimplePagination } from "@/components/ui/simple-pagination";
import type { Booking, BookingStatus } from "@/types/booking";

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
  refunded: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export function BookingTable() {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
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
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    },
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

  const bookingData: Booking[] = data?.data || [];
  const totalItems = bookingData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookingData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          {currentBookings.map((booking) => {
            const status = booking.status;
            const badgeClass =
              statusStyles[status] ??
              "bg-gray-100 text-gray-700 border-gray-300";
            const isUpdating = updatingId === booking._id;

            return (
              <tr key={booking._id} className="border-b">
                <td className="px-4 py-4 text-sm">
                  {booking._id?.slice(0, 6)}...
                </td>
                <td className="px-4 py-4 text-sm">
                  {booking.user?.firstName} {booking.user?.lastName}
                </td>
                <td className="px-4 py-4 text-sm">{booking.room}</td>
                <td className="px-4 py-4 text-sm text-center">
                  {booking.user?.numberOfPeople}
                </td>
                <td className="px-4 py-4 text-sm">{booking.service}</td>
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
                <td className="px-4 py-4 text-sm">
                  ${booking.total?.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm">
                  <Select
                    defaultValue={status}
                    disabled={isUpdating}
                    onValueChange={(value: any) =>
                      updateBookingStatus(booking._id, value as BookingStatus)
                    }
                  >
                    <SelectTrigger
                      className={`w-[130px] h-8 capitalize ${badgeClass} border font-medium`}
                    >
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

      <SimplePagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
