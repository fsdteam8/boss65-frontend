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
    <Card className="h-[300px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-orange-500">
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
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{booking.room}</div>
                <div className="text-sm text-muted-foreground">
                  {booking.time}
                </div>
              </div>
              <Badge
                variant={
                  booking.status === "confirmed" ? "default" : "destructive"
                }
                className={
                  booking.status === "confirmed"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
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
