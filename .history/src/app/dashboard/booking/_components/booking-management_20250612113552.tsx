"use client";

// import { useState } from "react";
// import { BookingHeader } from "./booking-header";
// import { BookingPagination } from "./booking-pagination";
import { BookingTable } from "./booking-table";



export function BookingManagement() {
  // const [bookings, ] = useState<any[]>(initialBookings);
  // const [currentPage, ] = useState(1);
  // const [itemsPerPage] = useState(10);

  // Update booking status
  // const updateBookingStatus = (id: string, index: number, status: string) => {
  //   const updatedBookings = [...bookings];
  //   updatedBookings[index] = { ...updatedBookings[index], status };
  //   setBookings(updatedBookings);
  // };

  // Calculate pagination
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(bookings.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* <BookingHeader /> */}
      <div className="">
        <BookingTable
        />
        {/* <BookingPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={bookings.length}
          itemsPerPage={itemsPerPage}
          currentItemStart={indexOfFirstItem + 1}
          currentItemEnd={Math.min(indexOfLastItem, bookings.length)}
        /> */}
      </div>
    </div>
  );
}
