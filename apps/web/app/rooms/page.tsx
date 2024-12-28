import { RoomList } from "@/apps/web/components/rooms/room-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rooms | LuxStay",
  description: "Browse our luxurious rooms and suites",
}

export default function RoomsPage()
{
  return (
    <div>
      <div className="relative h-96 mb-16">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury Hotel Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Our Luxurious Rooms</h1>
            <p className="text-xl text-gray-200">Experience comfort and elegance like never before</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <RoomList />
      </div>
    </div>
  )
}

