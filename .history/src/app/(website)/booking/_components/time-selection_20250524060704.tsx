"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useBookingStore } from "@/store/booking/index"
import { useQuery } from "@tanstack/react-query"
import { isBefore, startOfDay, format, isToday } from "date-fns"
import { zonedTimeToUtc } from "date-fns-tz"

interface TimeSlot {
  start: string
  end: string
  available: boolean
}

interface TimeSlotsApiRes {
  status: boolean
  message: string
  data: TimeSlot[]
}

const DHAKA_TIMEZONE = "Asia/Dhaka"

export default function TimeSelection() {
  const { service, setStep } = useBookingStore()
  const { selectedDate, selectDate, selectTimeSlot, selectedTimeSlot } = useBookingStore()

  const serviceId = service?._id

  // Get current time in Dhaka timezone
  const dhakaTime = zonedTimeToUtc(new Date(), DHAKA_TIMEZONE)

  // Format selected date for API call (ensure it's in Dhaka timezone)
  const dateOnly = selectedDate ? format(zonedTimeToUtc(selectedDate, DHAKA_TIMEZONE), "yyyy-MM-dd") : null

  // Fetch available time slots for the selected date
  const { data, isLoading: loadingTimeSlots } = useQuery<TimeSlotsApiRes>({
    queryKey: ["timeSlots", service, selectedDate?.toISOString()],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking/check-availability`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          date: dateOnly,
          serviceId: serviceId,
        }),
      }).then((res) => res.json()),
    enabled: !!serviceId && !!dateOnly,
  })

  // Redirect if no service is selected
  if (!serviceId) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium">Please select a service first</p>
        <Button onClick={() => setStep("services")} className="mt-4 bg-orange-500 hover:bg-orange-600">
          Go to Service Selection
        </Button>
      </div>
    )
  }

  // Function to disable past dates (using Dhaka timezone)
  const isPastDate = (date: Date) => {
    const dhakaDate = zonedTimeToUtc(date, DHAKA_TIMEZONE)
    const dhakaNow = zonedTimeToUtc(new Date(), DHAKA_TIMEZONE)
    return isBefore(startOfDay(dhakaDate), startOfDay(dhakaNow))
  }

  // Function to check if a time slot is in the past for today's date
  const isTimeSlotPast = (timeSlot: TimeSlot) => {
    if (!selectedDate) return false

    const selectedDhaka = zonedTimeToUtc(selectedDate, DHAKA_TIMEZONE)
    const nowDhaka = zonedTimeToUtc(new Date(), DHAKA_TIMEZONE)

    // Only check time if it's today
    if (!isToday(selectedDhaka)) return false

    // Parse the time slot start time
    const [hours, minutes] = timeSlot.start.split(":").map(Number)
    const slotTime = new Date(selectedDhaka)
    slotTime.setHours(hours, minutes, 0, 0)

    return isBefore(slotTime, nowDhaka)
  }

  const timeSlots = data?.data ?? []
  const isDisabled = !selectedTimeSlot ? true : selectedTimeSlot.length === 0

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h2 className="font-medium text-orange-500 mb-4">Select Date (Dhaka Time)</h2>

        {/* Show current Dhaka time for reference */}
        <div className="mb-4 text-sm text-gray-600">Current time in Dhaka: {format(dhakaTime, "PPP p")}</div>

        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={(date) => selectDate(date || null)}
          className="rounded-md w-full"
          disabled={isPastDate}
          defaultMonth={dhakaTime} // Start with current month in Dhaka time
        />
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-medium text-orange-500 mb-4">Available Times</h2>

        {!selectedDate ? (
          <p className="text-center py-8 text-gray-500">Please select a date to view available times</p>
        ) : loadingTimeSlots ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-100 animate-pulse rounded"></div>
            ))}
          </div>
        ) : timeSlots && timeSlots.length > 0 ? (
          <div className="space-y-2">
            {timeSlots
              ?.filter((slot) => slot.available && !isTimeSlotPast(slot))
              .map((slot: TimeSlot, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (slot.available && !isTimeSlotPast(slot)) {
                      selectTimeSlot({
                        start: slot.start,
                        end: slot.end,
                      })
                    }
                  }}
                  disabled={!slot.available || isTimeSlotPast(slot)}
                  className={cn(
                    "w-full py-3 px-4 border border-yellow-400 rounded text-center transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    selectedTimeSlot?.some((s) => s.start === slot.start && s.end === slot.end) &&
                      "bg-orange-500 text-white",
                  )}
                >
                  {slot.start} - {slot.end}
                  {isTimeSlotPast(slot) && <span className="ml-2 text-xs">(Past)</span>}
                </button>
              ))}

            {/* Show message if all slots are past for today */}
            {timeSlots.filter((slot) => slot.available && !isTimeSlotPast(slot)).length === 0 && (
              <p className="text-center py-8 text-gray-500">
                {selectedDate && isToday(zonedTimeToUtc(selectedDate, DHAKA_TIMEZONE))
                  ? "No more available time slots for today"
                  : "No available time slots for this date"}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No available time slots for this date</p>
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
  )
}
