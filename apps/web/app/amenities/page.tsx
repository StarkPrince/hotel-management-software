import { AmenityList } from "@/apps/web/components/amenities/amenity-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Amenities | LuxStay",
  description: "Explore our luxury hotel amenities for an unforgettable stay",
}

export default function AmenitiesPage()
{
  return (
    <div>
      <div className="relative h-96 mb-16">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Hotel Amenities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">World-Class Amenities</h1>
            <p className="text-xl text-gray-200">Indulge in luxury and comfort</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Experience Unparalleled Luxury</h2>
          <p className="text-lg text-gray-600">
            At LuxStay, we pride ourselves on offering a wide array of premium amenities designed to enhance your stay.
            From state-of-the-art fitness centers to serene spa retreats, every aspect of our hotel is crafted to provide
            you with the utmost comfort and relaxation.
          </p>
        </div>
        <AmenityList />
      </div>
    </div>
  )
}

