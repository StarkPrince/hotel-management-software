"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface AddRoomDialogProps
{
    isOpen: boolean
    onClose: () => void
    onAddRoom: (roomData: any) => void
}

export function AddRoomDialog({ isOpen, onClose, onAddRoom }: AddRoomDialogProps)
{
    const [roomData, setRoomData] = useState({
        number: "",
        type: "STANDARD",
        floor: 1,
        price: 100,
        amenities: [],
    })

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onAddRoom(roomData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Room</DialogTitle>
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
                                onValueChange={(value) => setRoomData({ ...roomData, type: value })}
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
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={roomData.price}
                                onChange={(e) => setRoomData({ ...roomData, price: parseInt(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Room</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
