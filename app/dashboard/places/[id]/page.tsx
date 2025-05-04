import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Mail, MapPin, Phone, User } from "lucide-react"
import { getPlaceById } from "@/lib/places"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const place = await getPlaceById(props.params.id)
  
  if (!place) return { title: 'Place not found' }
  return { title: place.name }
}

export default async function PlaceDetailsPage(props: Props) {
  const place = await getPlaceById(props.params.id)

  if (!place) {
    notFound()
  }

  const amenities = place.amenities ? JSON.parse(place.amenities) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{place.name}</h1>
        <p className="text-gray-600 mt-1 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {place.location}
        </p>
      </div>

      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
        <Image 
          src={place.image || "/placeholder.svg"} 
          fill 
          alt={place.name} 
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Info Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Event Info</h2>
            <p className="text-gray-700 mb-4">{place.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start">
                <User className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium">Capacity</h3>
                  <p className="text-gray-600">{place.capacity} people</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium">Price</h3>
                  <p className="text-gray-600">${place.price.toString()}</p>
                </div>
              </div>
            </div>

            <h3 className="font-medium mt-6 mb-2">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                  {amenity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p>{place.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
                <p>{place.capacity} guests</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p>${place.price.toString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Actions */}
        <div className="flex flex-col space-y-3">
          <Button size="lg">Book Now</Button>
          <Button variant="outline" size="lg">Contact Host</Button>
        </div>
      </div>
    </div>
  )
}
