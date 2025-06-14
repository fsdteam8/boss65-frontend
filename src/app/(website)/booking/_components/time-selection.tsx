"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useBookingStore } from "@/store/booking/index"
import { useQuery } from "@tanstack/react-query"
import { isBefore, startOfDay } from "date-fns"
import moment from "moment"

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

export default function TimeSelection() {
  const { service, setStep } = useBookingStore()
  const { selectedDate, selectDate, selectTimeSlot, selectedTimeSlot, room } = useBookingStore()

  const serviceId = service?._id

  // Keep using moment for API request format as before
  const dateOnly = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : ""

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
          roomId: room?._id,
        }),
      }).then((res) => res.json()),
    enabled: !!serviceId && !!dateOnly,
  })

  // Function to format time in 12-hour format
  const formatTime = (timeString: string): string => {
    if (!timeString) return ""

    // Parse the time string (assuming format like "09:00" or "14:30")
    const [hoursStr, minutesStr] = timeString.split(":")
    const hours = Number.parseInt(hoursStr, 10)
    const minutes = Number.parseInt(minutesStr, 10)

    if (isNaN(hours) || isNaN(minutes)) return timeString

    // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12 // Convert 0 to 12 for 12 AM and 12 to 12 for 12 PM

    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Function to ensure we have all 24 time slots
  const ensureComplete24HourSlots = (slots: TimeSlot[]): TimeSlot[] => {
    if (!slots || slots.length === 0) return []

    // Create a map of existing slots for quick lookup
    const slotMap = new Map<string, TimeSlot>()
    slots.forEach((slot) => {
      slotMap.set(slot.start, slot)
    })

    // Generate all 24 hour slots
    const complete24HourSlots: TimeSlot[] = []

    for (let hour = 0; hour < 24; hour++) {
      const startHour = hour.toString().padStart(2, "0") + ":00"
      const endHour = ((hour + 1) % 24).toString().padStart(2, "0") + ":00"

      // Use existing slot data if available, otherwise create a default available slot
      const existingSlot = slotMap.get(startHour)
      complete24HourSlots.push({
        start: startHour,
        end: endHour,
        available: existingSlot ? existingSlot.available : true,
      })
    }

    return complete24HourSlots
  }

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

  // Function to disable past dates
  const isPastDate = (date: Date) => {
    return isBefore(date, startOfDay(new Date()))
  }

  // Ensure we have complete 24-hour slots
  const timeSlots = data?.data ? ensureComplete24HourSlots(data.data) : []
  const isDisabled = !selectedTimeSlot ? true : selectedTimeSlot.length === 0

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border rounded-lg p-4 max-h-96">
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
        <h2 className="font-medium text-orange-500 mb-4">
          Available Times <span className="text-sm">(You can select multiple slots at once)</span>
        </h2>

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
            {timeSlots.map((slot: TimeSlot, i) => (
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
                  !slot.available && "bg-orange-100 cursor-not-allowed",
                  selectedTimeSlot?.some((s) => s.start === slot.start && s.end === slot.end) &&
                    "bg-orange-500 text-white",
                )}
              >
                {formatTime(slot.start)} - {formatTime(slot.end)} {!slot.available && "(Already Booked!)"}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No available time slots for this date</p>
        )}

        {/* <div className="mt-4 text-sm text-gray-600">Total slots: {timeSlots.length}/24</div> */}

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
