import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, MessageSquare } from "lucide-react"
import { getTopPlaces } from "@/lib/places"
import { auth } from "@/lib/auth" // You'll need to implement this

export default async function Dashboard() {
  const places = await getTopPlaces(4)
  const session = await auth() // Get the current user session

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name || 'User'}!</h1>
          <p className="text-gray-600 mt-1">Here to visit History?</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="relative">
            <Image
              src={session?.user?.image || "/placeholder.svg?height=40&width=40"}
              width={40}
              height={40}
              className="rounded-full"
              alt="User avatar"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
          </div>
          <div>
            <p className="text-sm font-medium">{session?.user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Places Visited</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-2 bg-green-50 rounded-full">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Messages</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-full">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Places to Visit</h2>
          <Link href="/dashboard/places" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {places.map((place) => (
            <Link key={place.id} href={`/dashboard/places/${place.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <Image
                  src={place.image || "/placeholder.svg"}
                  width={300}
                  height={200}
                  alt={place.name}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{place.description}</p>
                  <p className="text-blue-600 font-semibold mt-2">${place.price.toString()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
