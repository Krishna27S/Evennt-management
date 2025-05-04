import { useState, useEffect } from 'react'
import type { Place } from '@/types'

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('/api/places')
        if (!response.ok) throw new Error('Failed to fetch places')
        const data = await response.json()
        setPlaces(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  return { places, loading, error }
}