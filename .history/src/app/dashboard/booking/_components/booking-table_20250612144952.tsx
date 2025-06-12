/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useMemo, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { format, isToday } from "date-fns"
import { toast } from "sonner"
import { Loader2, Mail, ArrowUpDown, ArrowUp, ArrowDown, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import EmailSendingModal from "@/components/ui/email-sending-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// import type { BookingStatus } from "@/types/bookingDataType/bookingDataType"
import type { BookingApiResponse } from "@/types/bookingDataType/bookingDataType"
import DateRangePickerUpdate from "./DateRangePicker"
import { Pagination } from "@/components/ui/pagination"
import type { BookingStatus } from "@/types/booking"

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-100 text-green-700 border-green-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
  refunded: "bg-yellow-100 text-yellow-700 border-yellow-300",
  pending: "bg-amber-100 text-amber-800 border-amber-300",
}

interface SelectedData {
  dateRange: { from: Date | null; to: Date | null }
  queryParams: string
  compare: boolean
  daysDifference: number
}

type SortOrder = "asc" | "desc" | null

// Utility function to format time with proper type safety
const formatTime = (timeStr: string | undefined): string => {
  if (!timeStr) return ""

  const [hourStr, minuteStr = "00"] = timeStr.split(":")
  const hour = Number.parseInt(hourStr, 10)
  const minute = Number.parseInt(minuteStr, 10)

  if (isNaN(hour) || isNaN(minute)) return ""

  const date = new Date()
  date.setHours(hour)
  date.setMinutes(minute)

  return date
    .toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()
}

export function BookingTable() {
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [showTodayOnly, setShowTodayOnly] = useState(false)
  const [defaultDateRange] = useState({
    from: null,
    to: null,
  })
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const { data: session } = useSession()
  const token = (session?.user as { accessToken: string })?.accessToken
  const [selectedData, setSelectedData] = useState<SelectedData | null>(null)
  const { data, isLoading, refetch } = useQuery<BookingApiResponse>({
    queryKey: ["booking", currentPage, status, selectedData],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking?status=${status || ""}&${selectedData?.queryParams || ""}&page=${currentPage}`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to fetch bookings")
      return res.json()
    },
    enabled: !!token,
  })

  useEffect(() => {
    if (data?.data?.pagination?.currentPage && data.data.pagination.currentPage !== currentPage) {
      setCurrentPage(data.data.pagination.currentPage)
    }
  }, [data?.data?.pagination?.currentPage])

  const filteredAndSortedBookings = useMemo(() => {
    let bookings = data?.data?.bookings || []

    // Filter for today's bookings if showTodayOnly is true
    if (showTodayOnly) {
      bookings = bookings.filter((booking) => isToday(new Date(booking.date)))
    }

    // Sort bookings by date if sortOrder is set
    if (sortOrder) {
      bookings = [...bookings].sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()

        if (sortOrder === "asc") {
          return dateA - dateB
        } else {
          return dateB - dateA
        }
      })
    }

    return bookings
  }, [data?.data?.bookings, sortOrder, showTodayOnly])

  const handleSortByDate = () => {
    if (sortOrder === null) {
      setSortOrder("asc")
    } else if (sortOrder === "asc") {
      setSortOrder("desc")
    } else {
      setSortOrder(null)
    }
  }

  const handleTodayFilter = () => {
    setShowTodayOnly(!showTodayOnly)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const getSortIcon = () => {
    if (sortOrder === "asc") return <ArrowUp className="h-4 w-4" />
    if (sortOrder === "desc") return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }

  const updateBookingStatus = async (bookingId: string, newStatus: BookingStatus) => {
    setUpdatingId(bookingId)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      toast.success("Booking status updated!")
      refetch()
    } catch {
      toast.error("Failed to update booking status")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDateRangeChange = (data: {
    dateRange: { from: Date | null; to: Date | null }
    queryParams: string
    compare: boolean
    daysDifference: number
  }) => {
    setSelectedData(data)
    setShowTodayOnly(false) // Reset today filter when date range changes
    setCurrentPage(1) // Reset to first page when date range changes

    if (data.dateRange.from && data.dateRange.to) {
      // setDefaultDateRange({
      //   from: data.dateRange.from,
      //   to: data.dateRange.to,
      // })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-[30px] md:mb-[60px]">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10">
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value)
              setCurrentPage(1) // Reset to first page when status changes
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-white placeholder:text-black text-black/90 font-bold focus:ring-0 border border-black/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleTodayFilter}
            variant={showTodayOnly ? "default" : "outline"}
            className="w-full sm:w-auto"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>

          <DateRangePickerUpdate onDateRangeChange={handleDateRangeChange} defaultDateRange={defaultDateRange} />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-md shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1200px]">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-sm font-medium text-gray-500">ID</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Phone</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Rooms</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 text-center">People</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Service</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 min-w-[140px]">
                  <button
                    onClick={handleSortByDate}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                  >
                    Date & Time
                    {getSortIcon()}
                  </button>
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedBookings?.map((booking) => {
                const badgeClass = statusStyles[booking.status] ?? "bg-gray-100 text-gray-700 border-gray-300"
                const isUpdating = updatingId === booking._id

                return (
                  <tr key={booking._id} className="border-b">
                    <td className="px-4 py-4 text-sm">{booking._id}</td>
                    <td className="px-4 py-4 text-sm">
                      {booking.user?.firstName || ""} {booking.user?.lastName || ""}
                    </td>
                    <td className="px-4 py-4 text-sm">{booking.user?.phone || "-"}</td>
                    <td className="px-4 py-4 text-sm">{booking.room?.title || "-"}</td>
                    <td className="px-4 py-4 text-sm">{booking?.service?.category?.name || "-"}</td>
                    <td className="px-4 py-4 text-sm text-center">{booking.user?.numberOfPeople || "-"}</td>
                    <td className="px-4 py-4 text-sm">{booking.service?.name || "-"}</td>
                    <td className="px-4 py-4 text-sm min-w-[140px]">
                      <div className="space-y-1">
                        <div className="font-medium">{format(new Date(booking.date), "MMM dd, yyyy")}</div>
                        <div className="space-y-0.5">
                          {booking.timeSlots?.map((slot, i) => (
                            <div key={i} className="text-xs text-gray-600 whitespace-nowrap">
                              {formatTime(slot.start)} - {formatTime(slot.end)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">${booking.total?.toFixed(2) || "0.00"}</td>
                    <td className="px-4 py-4 text-sm">
                      <Select
                        defaultValue={booking.status}
                        disabled={isUpdating}
                        onValueChange={(value) => updateBookingStatus(booking._id, value as BookingStatus)}
                      >
                        <SelectTrigger className={`w-[130px] h-8 capitalize ${badgeClass} border font-medium`}>
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="refunded" disabled={booking.isManualBooking}>
                            Refunded
                          </SelectItem>
                          <SelectItem value="cancelled" disabled={booking.isManualBooking}>
                            Cancelled
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <EmailSendingModal
                        recipientEmail={booking.user?.email}
                        trigger={
                          <Button variant="ghost" size="icon">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Send email</span>
                          </Button>
                        }
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="bg-white rounded-b-[8px] py-4">
            {/* Only show pagination when not filtering by today and when there are multiple pages */}
            {!showTodayOnly && data?.data?.pagination?.totalPages && data.data.pagination.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={data?.data?.pagination?.currentPage || 1}
                  totalResults={data?.data?.pagination?.totalData || 0}
                  resultsPerPage={Math.ceil(
                    (data?.data?.pagination?.totalData || 0) / (data?.data?.pagination?.totalPages || 1),
                  )}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            {/* Show filtered results info when filtering by today */}
            {showTodayOnly && (
              <div className="flex justify-center">
                <p className="text-sm text-gray-600">
                  Showing {filteredAndSortedBookings.length} booking{filteredAndSortedBookings.length !== 1 ? "s" : ""}{" "}
                  for today
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showTodayOnly && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700">
            Filtered to show only today&apos;s bookings ({filteredAndSortedBookings.length} found)
          </p>
        </div>
      )}
    </div>
  )
}
