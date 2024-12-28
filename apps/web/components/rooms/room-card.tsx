'use client'

import { Room, RoomStatus } from "@/apps/web/types"
import { motion } from "framer-motion"
import { Star, Tv, Wifi, Wine } from 'lucide-react'

interface RoomCardProps
{
  room: Room
}

export function RoomCard({ room }: RoomCardProps)
{
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img src={room.imageUrl} alt={`Room ${room.number}`} className="w-full h-64 object-cover" />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
          {room.type}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Room {room.number}</h3>
        <p className="text-gray-600 mb-4">{room.floor}th Floor</p>
        <div className="flex items-center mb-4">
          <Star className="text-yellow-400 mr-1" size={20} />
          <Star className="text-yellow-400 mr-1" size={20} />
          <Star className="text-yellow-400 mr-1" size={20} />
          <Star className="text-yellow-400 mr-1" size={20} />
          <Star className="text-gray-300" size={20} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {room.amenities.includes("WiFi") && <Wifi size={20} className="text-blue-500" />}
            {room.amenities.includes("TV") && <Tv size={20} className="text-green-500" />}
            {room.amenities.includes("Mini Bar") && <Wine size={20} className="text-red-500" />}
          </div>
          <p className="text-3xl font-bold text-gray-800">${room.price}</p>
        </div>
        <button
          className={`w-full py-2 px-4 rounded-full font-semibold text-white transition-colors duration-300 ${room.status === RoomStatus.AVAILABLE
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={room.status !== RoomStatus.AVAILABLE}
        >
          {room.status === RoomStatus.AVAILABLE ? "Book Now" : "Not Available"}
        </button>
      </div>
    </motion.div>
  )
}

