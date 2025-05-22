import React from 'react'
import BookingConfirmation from './_components/booking-confirmation'

const Page = ({params}: {params: {id: string}}) => {
  const bookingId = params.id
  return (
    <div>
      <BookingConfirmation bookingId={bookingId} />
    </div>
  )
}

export default Page