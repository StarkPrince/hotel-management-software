"use client";

import { RoomCard } from "@/apps/web/components/rooms/room-card";
import { Room, RoomStatus, RoomType } from "@/apps/web/types";
import { useState } from "react";

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
];

export function RoomList()
{
  const [rooms] = useState(mockRooms);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}