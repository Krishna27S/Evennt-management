import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Building } from "lucide-react"
import prisma from "@/lib/db"
import { format } from "date-fns"

async function getBookings() {
  "use server"
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        place: true
      },
      orderBy: {
        eventDate: 'asc'
      }
    })
    return bookings
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
}

export default async function BookingsPage() {
  const bookings = await getBookings()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Historical Event Bookings</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-semibold">{booking.eventName}</h2>
                    <p className="text-sm text-gray-500">Historical Experience</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(booking.eventDate), 'PPPP')}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    {format(new Date(booking.eventDate), 'p')}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="h-4 w-4" />
                    {booking.place.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    {booking.guestCount} attendees
                  </div>
                </div>
                
                <div className="space-y-3 text-right">
                  <Badge 
                    className={
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {booking.status}
                  </Badge>
                  <p className="text-2xl font-bold">
                    ${booking.totalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Organized by: {booking.userName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.userEmail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
