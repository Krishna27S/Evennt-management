export interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  location: string;
  capacity: number;
  available: boolean;
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
  amenities: string[];
  vendor: {
    name: string;
    serviceType: string;
    contact: string;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
  timeInfo: {
    eventTimings: string;
    availability: string;
  };
}