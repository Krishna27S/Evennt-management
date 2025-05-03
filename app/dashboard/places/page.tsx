import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for places
const places = [
  {
    id: 1,
    name: "Grand Ballroom",
    description:
      "Elegant venue for large gatherings and formal events. Features crystal chandeliers, marble floors, and state-of-the-art sound system.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Garden Terrace",
    description:
      "Beautiful outdoor space perfect for ceremonies and receptions. Lush greenery, water features, and string lighting create a magical atmosphere.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Conference Center",
    description:
      "Professional setting for business meetings and conferences. Equipped with the latest technology and flexible seating arrangements.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Beachfront Resort",
    description:
      "Stunning coastal location for destination events. Panoramic ocean views and private beach access for unforgettable experiences.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Historic Mansion",
    description:
      "Timeless elegance in a restored historic building. Rich architecture and vintage charm for sophisticated events.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Urban Loft",
    description:
      "Modern industrial space in the heart of downtown. Exposed brick, high ceilings, and versatile layout for creative events.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    name: "Vineyard Estate",
    description:
      "Rustic charm surrounded by rolling vineyards. Barrel room, tasting areas, and scenic views for wine-themed gatherings.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    name: "Mountain Lodge",
    description:
      "Cozy retreat with breathtaking mountain views. Stone fireplaces, wooden beams, and outdoor spaces for nature-inspired events.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function PlacesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Places to Visit</h1>
        <p className="text-gray-600 mt-1">Discover amazing venues for your next event</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <Card key={place.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
            <Image
              src={place.image || "/placeholder.svg"}
              width={300}
              height={200}
              alt={place.name}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-5">
              <h3 className="font-semibold text-xl">{place.name}</h3>
              <p className="text-gray-600 mt-2 mb-4 line-clamp-3">{place.description}</p>
              <Button asChild>
                <Link href={`/dashboard/places/${place.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
