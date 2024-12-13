"use client";

import { FloorSelector } from "@/components/rooms/floor-selector";
import { RoomCard } from "@/components/rooms/room-card";
import { StatusLegend } from "@/components/rooms/status-legend";
import { Button } from "@/components/ui/button";
import { useRooms } from "@/hooks/use-rooms";
import { Plus } from "lucide-react";
import { useState } from "react";

const floors = [1, 2, 3, 4, 5];

export default function RoomsPage()
{
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const { rooms, isLoading } = useRooms();

  const roomsOnFloor = rooms?.filter((room: any) =>
    room.number.startsWith(selectedFloor.toString())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <div className="flex gap-4">
          <FloorSelector
            value={selectedFloor}
            onChange={setSelectedFloor}
            floors={floors}
          />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {roomsOnFloor?.map((room: any) => (
            <RoomCard
              key={room.number}
              number={room.number}
              status={room.status}
            />
          ))}
        </div>
      )}

      <StatusLegend />
    </div>
  );
}