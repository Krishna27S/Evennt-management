import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Mail, MapPin, Phone, User } from "lucide-react"

// Mock data for a specific place
const getPlaceDetails = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Grand Ballroom",
    description:
      "The Grand Ballroom is an elegant venue perfect for large gatherings and formal events. With its crystal chandeliers, marble floors, and state-of-the-art sound system, it provides a sophisticated backdrop for weddings, galas, and corporate functions. The space can accommodate up to 300 guests for a seated dinner or 500 for a standing reception.",
    image: "/placeholder.svg?height=400&width=800",
    date: "Available year-round",
    capacity: "Up to 300 seated, 500 standing",
    amenities: ["Stage", "Dance floor", "Full-service bar", "Catering kitchen", "Coat check", "Valet parking"],
    vendor: {
      name: "Luxury Events Inc.",
      serviceType: "Full-service venue management",
      contact: "Sarah Johnson, Event Director",
    },
    contactInfo: {
      email: "bookings@grandballroom.com",
      phone: "+1 (555) 123-4567",
    },
    timeInfo: {
      eventTimings: "Available 8:00 AM - 1:00 AM",
      availability: "Booking 3-18 months in advance recommended",
    },
    location: "123 Elegant Avenue, Cityville, State 12345",
  }
}

export default function PlaceDetailsPage({ params }: { params: { id: string } }) {
  const place = getPlaceDetails(params.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{place.name}</h1>
        <p className="text-gray-600 mt-1 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {place.location}
        </p>
      </div>

      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
        <Image src={place.image || "/placeholder.svg"} fill alt={place.name} className="object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Info</h2>
            <p className="text-gray-700 mb-4">{place.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium">Availability</h3>
                  <p className="text-gray-600">{place.date}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium">Capacity</h3>
                  <p className="text-gray-600">{place.capacity}</p>
                </div>
              </div>
            </div>

            <h3 className="font-medium mt-6 mb-2">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {place.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                  {amenity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Vendor Info</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{place.vendor.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Service Type</h3>
                  <p>{place.vendor.serviceType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Person</h3>
                  <p>{place.vendor.contact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <p>{place.contactInfo.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <p>{place.contactInfo.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Time Info</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Event Timings</h3>
                    <p className="text-gray-600">{place.timeInfo.eventTimings}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Availability</h3>
                    <p className="text-gray-600">{place.timeInfo.availability}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-3">
            <Button size="lg">Book Now</Button>
            <Button variant="outline" size="lg">
              Contact Vendor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
