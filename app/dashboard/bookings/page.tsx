import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

// Mock data for bookings
const bookings = [
  {
    id: 1,
    place: "Grand Ballroom",
    date: "June 15, 2024",
    time: "6:00 PM - 11:00 PM",
    status: "Confirmed",
    guests: 150,
    type: "Wedding Reception",
  },
  {
    id: 2,
    place: "Conference Center",
    date: "July 10, 2024",
    time: "9:00 AM - 5:00 PM",
    status: "Pending",
    guests: 75,
    type: "Corporate Meeting",
  },
  {
    id: 3,
    place: "Garden Terrace",
    date: "August 22, 2024",
    time: "4:00 PM - 8:00 PM",
    status: "Confirmed",
    guests: 100,
    type: "Birthday Celebration",
  },
]

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your upcoming events</p>
        </div>
        <Button className="mt-4 md:mt-0">Create New Booking</Button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div
                  className={`w-full md:w-2 ${
                    booking.status === "Confirmed"
                      ? "bg-green-500"
                      : booking.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                ></div>
                <div className="p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{booking.type}</h2>
                      <p className="text-gray-600">{booking.place}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{booking.guests} guests</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Modify Booking
                    </Button>
                    {booking.status === "Pending" && (
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
