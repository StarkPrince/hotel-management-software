"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchAmenities } from "@/lib/api"
import { Amenity, Room, RoomStatus, RoomType } from "@/types"
import { useEffect, useState } from "react"

interface EditRoomDialogProps
{
    isOpen: boolean
    onClose: () => void
    onEditRoom: (roomData: Partial<Room>) => void
    room: Room | null
}

export function EditRoomDialog({ isOpen, onClose, onEditRoom, room }: EditRoomDialogProps)
{
    const [roomData, setRoomData] = useState<Partial<Room>>({
        number: "",
        type: RoomType.STANDARD,
        status: RoomStatus.AVAILABLE,
        floor: 1,
        price: 0,
        amenities: [],
    })
    const [amenities, setAmenities] = useState<Amenity[]>([])

    useEffect(() =>
    {
        if (room) {
            setRoomData(room)
        }
    }, [room])

    useEffect(() =>
    {
        const loadAmenities = async () =>
        {
            const data = await fetchAmenities()
            setAmenities(data)
        }
        loadAmenities()
    }, [])

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onEditRoom(roomData)
    }

    const handleAmenityChange = (amenityId: string, checked: boolean) =>
    {
        if (checked) {
            setRoomData({
                ...roomData,
                amenities: [...(roomData.amenities || []), { id: amenityId } as Amenity],
            })
        } else {
            setRoomData({
                ...roomData,
                amenities: roomData.amenities?.filter((a) => a.id !== amenityId) || [],
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Room</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Room Number
                            </Label>
                            <Input
                                id="number"
                                value={roomData.number}
                                onChange={(e) => setRoomData({ ...roomData, number: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Room Type
                            </Label>
                            <Select
                                value={roomData.type}
                                onValueChange={(value) => setRoomData({ ...roomData, type: value as RoomType })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="STANDARD">Standard</SelectItem>
                                    <SelectItem value="DELUXE">Deluxe</SelectItem>
                                    <SelectItem value="SUITE">Suite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                value={roomData.status}
                                onValueChange={(value) => setRoomData({ ...roomData, status: value as RoomStatus })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select room status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(RoomStatus).map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="floor" className="text-right">
                                Floor
                            </Label>
                            <Input
                                id="floor"
                                type="number"
                                value={roomData.floor}
                                onChange={(e) => setRoomData({ ...roomData, floor: parseInt(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                PricePrice
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={roomData.price}
                                onChange={(e) => setRoomData({ ...roomData, price: parseFloat(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Amenities</Label>
                            <div className="col-span-3 space-y-2">
                                {amenities.map((amenity) => (
                                    <div key={amenity.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`amenity-${amenity.id}`}
                                            checked={roomData.amenities?.some((a) => a.id === amenity.id)}
                                            onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                                        />
                                        <Label htmlFor={`amenity-${amenity.id}`}>{amenity.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

