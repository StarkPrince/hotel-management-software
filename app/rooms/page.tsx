"use client"

import { createRoom, fetchRooms, updateRoom } from "@/api"
import { AddRoomDialog } from "@/components/rooms/add-room-dialog"
import { roomColumns } from "@/components/rooms/columns"
import { EditRoomDialog } from "@/components/rooms/edit-room-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Room, RoomStatus } from "@/types"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"

export default function RoomsPage()
{
  const [rooms, setRooms] = useState<Room[]>([])
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false)
  const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  useEffect(() =>
  {
    const loadRooms = async () =>
    {
      const data = await fetchRooms()
      setRooms(data)
    }
    loadRooms()
  }, [])

  const handleAddRoom = async (roomData: Partial<Room>) =>
  {
    try {
      const newRoom = await createRoom(roomData)
      setRooms([...rooms, newRoom])
      setIsAddRoomDialogOpen(false)
    } catch (error) {
      console.error("Failed to add room:", error)
    }
  }

  const handleEditRoom = async (roomData: Partial<Room>) =>
  {
    if (selectedRoom) {
      try {
        const updatedRoom = await updateRoom(selectedRoom.id, roomData)
        setRooms(rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room))
        setIsEditRoomDialogOpen(false)
      } catch (error) {
        console.error("Failed to update room:", error)
      }
    }
  }

  const handleRowAction = (room: Room, action: string) =>
  {
    if (action === 'edit') {
      setSelectedRoom(room)
      setIsEditRoomDialogOpen(true)
    }
  }

  const getRoomStatusColor = (status: RoomStatus) =>
  {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return "bg-green-500"
      case RoomStatus.OCCUPIED:
        return "bg-red-500"
      case RoomStatus.MAINTENANCE:
        return "bg-yellow-500"
      case RoomStatus.CLEANING:
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <Button onClick={() => setIsAddRoomDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(RoomStatus).map((status) => (
          <Card key={status}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {status} Rooms
              </CardTitle>
              <Badge className={getRoomStatusColor(status)}>{rooms.filter(room => room.status === status).length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{((rooms.filter(room => room.status === status).length / rooms.length) * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                of total rooms
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={roomColumns}
            data={rooms}
            filterColumn="number"
            onRowAction={handleRowAction}
          />
        </CardContent>
      </Card>

      <AddRoomDialog
        isOpen={isAddRoomDialogOpen}
        onClose={() => setIsAddRoomDialogOpen(false)}
        onAddRoom={handleAddRoom}
      />

      <EditRoomDialog
        isOpen={isEditRoomDialogOpen}
        onClose={() => setIsEditRoomDialogOpen(false)}
        onEditRoom={handleEditRoom}
        room={selectedRoom}
      />
    </div>
  )
}

