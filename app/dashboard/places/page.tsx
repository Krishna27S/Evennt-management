import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import prisma from "@/lib/db"

async function getPlaces() {
  try {
    return await prisma.place.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  } catch (error) {
    console.error('Error fetching places:', error)
    return []
  }
}

export default async function PlacesPage() {
  const places = await getPlaces()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Places to Visit</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {places.map((place) => (
          <Link 
            key={place.id} 
            href={`/dashboard/places/${place.id}`}
            className="block"
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {place.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-blue-600 font-bold">
                    ${place.price.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Capacity: {place.capacity}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
