import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PlaceNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-3xl font-bold">Place Not Found</h1>
      <p className="text-gray-600">The place you're looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/dashboard/places">View All Places</Link>
      </Button>
    </div>
  )
}