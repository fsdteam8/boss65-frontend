"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", bookings: 40 },
  { name: "Feb", bookings: 30 },
  { name: "Mar", bookings: 45 },
  { name: "Apr", bookings: 50 },
  { name: "May", bookings: 65 },
  { name: "Jun", bookings: 60 },
  { name: "Jul", bookings: 80 },
  { name: "Aug", bookings: 90 },
  { name: "Sep", bookings: 100 },
  { name: "Oct", bookings: 110 },
  { name: "Nov", bookings: 105 },
  { name: "Dec", bookings: 120 },
];

export function BookingTrends() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-orange-500">
          Booking Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f5f5f5"
              />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#FF6B00"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#FF6B00"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorBookings)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
