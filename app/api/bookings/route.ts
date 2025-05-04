import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const booking = await prisma.booking.create({
      data: {
        placeId: body.placeId,
        userName: body.name,
        userEmail: body.email,
        eventDate: new Date(body.date),
        guestCount: parseInt(body.guestCount),
        totalPrice: body.totalPrice,
        status: "pending"
      },
    })

    await prisma.userInfo.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        bookingId: booking.id
      }
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
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