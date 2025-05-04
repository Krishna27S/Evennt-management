export interface Place {
  id: number
  name: string
  description: string
  image: string
  price: Decimal
  location: string
  capacity: number
  available: boolean
  amenities?: string
  createdAt: Date
  updatedAt: Date
  bookings: Booking[]
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