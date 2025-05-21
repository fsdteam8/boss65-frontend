import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const bookings = [
  {
    id: 1,
    room: "Japanese Room",
    time: "Today, 4:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    room: "Mystery Room",
    time: "Today, 4:00 PM",
    status: "cancelled",
  },
  {
    id: 3,
    room: "Space Room",
    time: "Today, 4:00 PM",
    status: "confirmed",
  },
];

export function RecentBookings() {
  return (
    <Card className="h-full ">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[20px] font-medium text-[#FF6900] ">
          Recent Bookings
        </CardTitle>
        <Link
          href="/dashboard/bookings"
          className="text-xs text-blue-500 hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 ">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between border border-[#0000001A] px-[12px] py-[8px] rounded-xl">
              <div>
                <div className="font-medium text-[14px] text-[#000000] mb-[6px]">{booking.room}</div>
                <div className="text-[12px] font-medium">
                  {booking.time}
                </div>
              </div>
              <Badge
                variant={
                  booking.status === "confirmed" ? "default" : "destructive"
                }
                className={
                  booking.status === "confirmed"
                    ? "bg-[#DCFCE7] text-[#166534] hover:bg-[#DCFCE7] "
                    : "bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FEE2E2]"
                }
              >
                {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
