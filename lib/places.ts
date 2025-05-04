import prisma from '@/lib/db'

export async function getPlaceById(id: string) {
  try {
    const place = await prisma.place.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!place) return null

    // Transform database data to match our PlaceDetails interface
    return {
      ...place,
      amenities: [
        "Stage",
        "Dance floor",
        "Full-service bar",
        "Catering kitchen",
        "Coat check",
        "Valet parking"
      ],
      vendor: {
        name: "Luxury Events Inc.",
        serviceType: "Full-service venue management",
        contact: "Event Director",
      },
      contactInfo: {
        email: "bookings@venue.com",
        phone: "+1 (555) 123-4567",
      },
      timeInfo: {
        eventTimings: "Available 8:00 AM - 1:00 AM",
        availability: "Booking 3-18 months in advance recommended",
      }
    }
  } catch (error) {
    console.error('Error fetching place:', error)
    return null
  }
}

export async function getTopPlaces() {
  try {
    return await prisma.place.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      // Removed the 'take' limit to get all places
    })
  } catch (error) {
    console.error('Error fetching places:', error)
    throw error
  }
}