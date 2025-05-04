import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const places = await prisma.place.findMany({
      where: {
        available: true
      },
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        price: true,
        location: true,
        capacity: true,
        available: true
      }
    })

    return NextResponse.json(places)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}