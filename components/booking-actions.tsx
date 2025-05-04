"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/BookingModal"
import { Place } from "@/types"

interface BookingActionsProps {
  place: Place
}

export function BookingActions({ place }: BookingActionsProps) {
  const [showModal, setShowModal] = useState(false)

  const handleBookNow = () => {
    setShowModal(true)
  }

  return (
    <div className="flex flex-col space-y-3">
      <Button size="lg" onClick={handleBookNow}>
        Book Now
      </Button>
      <Button variant="outline" size="lg">Contact Host</Button>
      <BookingModal 
        show={showModal}
        onClose={() => setShowModal(false)}
        place={place}
      />
    </div>
  )
}