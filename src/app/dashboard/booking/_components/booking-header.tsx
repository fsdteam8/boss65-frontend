"use client";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export function BookingHeader() {
  return (
    <div className="flex items-center justify-between mb-[60px]">
      <h1 className="text-2xl font-bold">Booking Management</h1>
      {/* <Select defaultValue="7days">
        <SelectTrigger className="w-[180px] bg-orange-500 text-white border-none">
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="7days">Last 7 days</SelectItem>
          <SelectItem value="30days">Last 30 days</SelectItem>
          <SelectItem value="90days">Last 90 days</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select> */}
    </div>
  );
}
