'use client'

import { Button } from "@/components/ui/button"

interface BookingButtonProps {
  onCancel: (id: number) => Promise<void>
  bookingId: number
}

export function BookingButton({ onCancel, bookingId }: BookingButtonProps) {
  return (
    <Button 
      variant="destructive" 
      onClick={async () => {
        try {
          await onCancel(bookingId)
          window.location.reload()
        } catch (error) {
          console.error('Cancel error:', error)
        }
      }}
    >
      Cancel Booking
    </Button>
  )
}