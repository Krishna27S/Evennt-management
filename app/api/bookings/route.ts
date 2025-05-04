import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const booking = await prisma.booking.create({
      data: {
        eventName: `Historical Visit - ${data.name}`,
        eventDate: new Date(data.eventDate),
        status: 'pending',
        placeId: data.placeId,
        userName: data.name,
        userEmail: data.email,
        guestCount: parseInt(data.guestCount),
        totalPrice: data.totalPrice,
      }
    })

    // Create user info record
    await prisma.userInfo.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        bookingId: booking.id
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // Delete user info first (due to foreign key constraint)
    await prisma.userInfo.deleteMany({
      where: { bookingId: parseInt(id) }
    })

    // Then delete the booking
    await prisma.booking.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    )
  }
}