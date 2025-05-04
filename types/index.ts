export interface Booking {
  id: number
  placeId: number
  userId: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Place {
  id: number
  name: string
  description: string
  image: string
  price: number  // Changed from Decimal to number
  location: string
  capacity: number
  available: boolean
  amenities?: string
  createdAt: Date
  updatedAt: Date
  bookings: Booking[]
}

export interface BookingModalProps {
  show: boolean
  onClose: () => void
  place: Place
}

export interface PlaceDetails {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  location: string;
  capacity: number;
  available: boolean;
  amenities: string;  // JSON string of amenities
  createdAt: Date;
  updatedAt: Date;
}

export interface PageParams {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}