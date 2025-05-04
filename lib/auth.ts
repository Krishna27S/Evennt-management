import { cookies } from 'next/headers'
import prisma from './db'

export async function auth() {
  const sessionId = (await cookies()).get('sessionId')?.value
  
  if (!sessionId) return null

  try {
    const user = await prisma.user.findFirst({
      where: {
        // Add your session validation logic here
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // Don't select password
      }
    })

    return user ? { user } : null
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}