import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users } from "lucide-react"
import { BookingButton } from "@/components/booking-button"
import prisma from "@/lib/db"
import { format } from "date-fns"

async function cancelBooking(id: number) {
  'use server'
  await prisma.userInfo.deleteMany({
    where: { bookingId: id }
  })
  await prisma.booking.delete({
    where: { id }
  })
}

export default async function MyBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      place: true,
      userInfo: true
    },
    orderBy: {
      eventDate: 'desc'
    }
  })

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">{booking.eventName}</h2>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(booking.eventDate), 'PPP')}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {booking.place.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {booking.guestCount} guests
                  </div>
                </div>
                <BookingButton 
                  onCancel={cancelBooking} 
                  bookingId={booking.id} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}