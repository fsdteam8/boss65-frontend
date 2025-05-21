"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/store/booking/index";
import { useQuery } from "@tanstack/react-query";
import { isBefore, startOfDay } from "date-fns";
import moment from "moment";

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface TimeSlotsApiRes {
  status: boolean;
  message: string;
  data: TimeSlot[];
}

export default function TimeSelection() {
  const { service, setStep } = useBookingStore();
  const { selectedDate, selectDate, selectTimeSlot, selectedTimeSlot } =
    useBookingStore();

  const serviceId = service?._id;

  const dateOnly = moment(selectedDate).format("YYYY-MM-DD");

  // Fetch available time slots for the selected date
  const { data, isLoading: loadingTimeSlots } = useQuery<TimeSlotsApiRes>({
    queryKey: ["timeSlots", service, selectedDate?.toISOString()],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking/check-availability`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date: dateOnly,
            serviceId: serviceId,
          }),
        }
      ).then((res) => res.json()),
    enabled: !!serviceId && !!dateOnly,
  });

  // Redirect if no service is selected
  if (!serviceId) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium">Please select a service first</p>
        <Button
          onClick={() => setStep("services")}
          className="mt-4 bg-orange-500 hover:bg-orange-600"
        >
          Go to Service Selection
        </Button>
      </div>
    );
  }

  // Function to disable past dates
  const isPastDate = (date: Date) => {
    return isBefore(date, startOfDay(new Date()));
  };
  const timeSLots = data?.data ?? [];

  const isDisabled = !selectedTimeSlot ? true : selectedTimeSlot.length === 0;

  console.log(selectedTimeSlot);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h2 className="font-medium text-orange-500 mb-4">Select Date</h2>

        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={(date) => selectDate(date || null)}
          className="rounded-md w-full"
          disabled={isPastDate}
          defaultMonth={new Date()} // Start with current month
        />
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-medium text-orange-500 mb-4">Available Times</h2>

        {!selectedDate ? (
          <p className="text-center py-8 text-gray-500">
            Please select a date to view available times
          </p>
        ) : loadingTimeSlots ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : timeSLots && timeSLots.length > 0 ? (
          <div className="space-y-2">
            {timeSLots
              ?.filter((i) => i.available)
              .map((slot: TimeSlot, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (slot.available) {
                      selectTimeSlot({
                        start: slot.start,
                        end: slot.end,
                      });
                    }
                  }}
                  disabled={!slot.available}
                  className={cn(
                    "w-full py-3 px-4 border border-yellow-400 rounded text-center  transition-colors",
                    selectedTimeSlot?.some(
                      (s) => s.start === slot.start && s.end === slot.end
                    ) && "bg-orange-500 text-white"
                  )}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">
            No available time slots for this date
          </p>
        )}
        <Button
          className="mt-4 w-full bg-orange-500 hover:bg-orange-500/80 disabled:opacity-50"
          onClick={() => setStep("confirm")}
          disabled={!!isDisabled}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
