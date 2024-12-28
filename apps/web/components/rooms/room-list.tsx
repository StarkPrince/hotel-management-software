'use client'

import { RoomCard } from "@/apps/web/components/rooms/room-card"
import { Room, RoomStatus, RoomType } from "@/apps/web/types"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

// This would come from your API in a real app
const mockRooms: Room[] = [
  {
    id: "1",
    number: "101",
    type: RoomType.STANDARD,
    floor: 1,
    price: 199.99,
    status: RoomStatus.AVAILABLE,
    amenities: ["WiFi", "TV", "Mini Bar"],
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    number: "201",
    type: RoomType.DELUXE,
    floor: 2,
    price: 299.99,
    status: RoomStatus.AVAILABLE,
    amenities: ["WiFi", "TV", "Mini Bar", "Ocean View"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    number: "301",
    type: RoomType.SUITE,
    floor: 3,
    price: 499.99,
    status: RoomStatus.AVAILABLE,
    amenities: ["WiFi", "TV", "Mini Bar", "Ocean View", "Jacuzzi"],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
  },
]

export function RoomList()
{
  const [rooms, setRooms] = useState(mockRooms)
  const [filter, setFilter] = useState<RoomType | 'ALL'>('ALL')

  useEffect(() =>
  {
    if (filter === 'ALL') {
      setRooms(mockRooms)
    } else {
      setRooms(mockRooms.filter(room => room.type === filter))
    }
  }, [filter])

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full ${filter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setFilter('ALL')}
        >
          All
        </button>
        {Object.values(RoomType).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full ${filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

