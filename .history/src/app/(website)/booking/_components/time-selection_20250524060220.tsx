"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useBookingStore } from "@/store/booking/index"
import { useQuery } from "@tanstack/react-query"
import { isBefore, startOfDay } from "date-fns"
import { utcToZonedTime, format } from "date-fns-tz"
import moment from "moment-timezone"

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

  // Get current date in Dhaka timezone
  const getCurrentDhakaDate = () => {
    return utcToZonedTime(new Date(), DHAKA_TIMEZONE)
  }

  // Format date for API call using Dhaka timezone
  const dateOnly = selectedDate ? moment.tz(selectedDate, DHAKA_TIMEZONE).format("YYYY-MM-DD") : null

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

  // Function to disable past dates based on Dhaka timezone
  const isPastDate = (date: Date) => {
    const dhakaToday = startOfDay(getCurrentDhakaDate())
    const dateInDhaka = utcToZonedTime(date, DHAKA_TIMEZONE)
    return isBefore(startOfDay(dateInDhaka), dhakaToday)
  }

  const timeSLots = data?.data ?? []
  const isDisabled = !selectedTimeSlot ? true : selectedTimeSlot.length === 0

  // Get current month in Dhaka timezone for calendar default
  const currentDhakaMonth = getCurrentDhakaDate()

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4">
        <h2 className="font-medium text-orange-500 mb-4">Select Date (Dhaka Time)</h2>

        <Calendar
          mode="single"
          selected={selectedDate || undefined}
          onSelect={(date) => {
            if (date) {
              // Convert selected date to Dhaka timezone
              const dhakaDate = utcToZonedTime(date, DHAKA_TIMEZONE)
              selectDate(dhakaDate)
            } else {
              selectDate(null)
            }
          }}
          className="rounded-md w-full"
          disabled={isPastDate}
          defaultMonth={currentDhakaMonth} // Start with current month in Dhaka time
        />

        {/* Display current Dhaka time for reference */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Current Dhaka time: {format(getCurrentDhakaDate(), "PPP p", { timeZone: DHAKA_TIMEZONE })}
        </div>
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
                      })
                    }
                  }}
                  disabled={!slot.available}
                  className={cn(
                    "w-full py-3 px-4 border border-yellow-400 rounded text-center transition-colors",
                    selectedTimeSlot?.some((s) => s.start === slot.start && s.end === slot.end) &&
                      "bg-orange-500 text-white",
                  )}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No available time slots for this date</p>
        )}

        {selectedDate && (
          <div className="mt-2 text-sm text-gray-600">
            Selected: {format(selectedDate, "PPP", { timeZone: DHAKA_TIMEZONE })}
          </div>
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
