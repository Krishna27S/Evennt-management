import { prisma } from './db'

export async function getPlaceById(id: string | number) {
  if (!id) return null
  
  try {
    const placeId = typeof id === 'string' ? parseInt(id) : id
    
    if (isNaN(placeId)) return null

    const place = await prisma.place.findUnique({
      where: {
        id: placeId
      },
      include: {
        bookings: true
      }
    })

    if (!place) return null

    // Convert Decimal to number for serialization
    return {
      ...place,
      price: Number(place.price)
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