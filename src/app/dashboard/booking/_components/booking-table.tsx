import type { Booking, BookingStatus } from "@/types/booking";

import { Button } from "@/components/ui/button";
import EmailSendingModal from "@/components/ui/email-sending-modal";
import { Mail } from "lucide-react";
import { BookingStatusCell } from "./booking-status-cell";

interface BookingTableProps {
  bookings: Booking[];
  updateBookingStatus: (
    id: string,
    index: number,
    status: BookingStatus
  ) => void;
}

export function BookingTable({
  bookings,
  updateBookingStatus,
}: BookingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Rooms
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Number Of People
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Services
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Date & Time
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={`${booking.id}-${index}`} className="border-b">
              <td className="px-4 py-4 text-sm">{booking.id}</td>
              <td className="px-4 py-4 text-sm">{booking.name}</td>
              <td className="px-4 py-4 text-sm">{booking.category}</td>
              <td className="px-4 py-4 text-sm">{booking.room}</td>
              <td className="px-4 py-4 text-sm text-center">
                {booking.numberOfPeople}
              </td>
              <td className="px-4 py-4 text-sm">{booking.services}</td>
              <td className="px-4 py-4 text-sm">
                {booking.date}
                <br />
                {booking.time}
              </td>
              <td className="px-4 py-4 text-sm">{booking.amount}</td>
              <td className="px-4 py-4 text-sm">
                <BookingStatusCell
                  status={booking.status}
                  onStatusChange={(newStatus) =>
                    updateBookingStatus(booking.id, index, newStatus)
                  }
                />
              </td>
              <td className="px-4 py-4 text-sm">
                <EmailSendingModal
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
