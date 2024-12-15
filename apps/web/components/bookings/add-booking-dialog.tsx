"use client"

import { Button } from "@/apps/web/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/apps/web/components/ui/dialog"
import { Input } from "@/apps/web/components/ui/input"
import { Label } from "@/apps/web/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/apps/web/components/ui/select"
import { useState } from "react"

interface AddBookingDialogProps
{
    isOpen: boolean
    onClose: () => void
    onAddBooking: (bookingData: any) => void
}

export function AddBookingDialog({ isOpen, onClose, onAddBooking }: AddBookingDialogProps)
{
    const [bookingData, setBookingData] = useState({
        roomId: "",
        guestName: "",
        guestEmail: "",
        checkIn: "",
        checkOut: "",
        source: "DIRECT",
        status: "CONFIRMED",
        totalAmount: 0,
        specialRequests: "",
    })

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onAddBooking(bookingData)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Booking</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="roomId" className="text-right">
                                Room ID
                            </Label>
                            <Input
                                id="roomId"
                                value={bookingData.roomId}
                                onChange={(e) => setBookingData({ ...bookingData, roomId: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="guestName" className="text-right">
                                Guest Name
                            </Label>
                            <Input
                                id="guestName"
                                value={bookingData.guestName}
                                onChange={(e) => setBookingData({ ...bookingData, guestName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="guestEmail" className="text-right">
                                Guest Email
                            </Label>
                            <Input
                                id="guestEmail"
                                type="email"
                                value={bookingData.guestEmail}
                                onChange={(e) => setBookingData({ ...bookingData, guestEmail: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="checkIn" className="text-right">
                                Check-in
                            </Label>
                            <Input
                                id="checkIn"
                                type="datetime-local"
                                value={bookingData.checkIn}
                                onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="checkOut" className="text-right">
                                Check-out
                            </Label>
                            <Input
                                id="checkOut"
                                type="datetime-local"
                                value={bookingData.checkOut}
                                onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="source" className="text-right">
                                Source
                            </Label>
                            <Select
                                value={bookingData.source}
                                onValueChange={(value) => setBookingData({ ...bookingData, source: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select booking source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="DIRECT">Direct</SelectItem>
                                    <SelectItem value="BOOKING_COM">Booking.com</SelectItem>
                                    <SelectItem value="EXPEDIA">Expedia</SelectItem>
                                    <SelectItem value="AIRBNB">Airbnb</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="totalAmount" className="text-right">
                                Total Amount
                            </Label>
                            <Input
                                id="totalAmount"
                                type="number"
                                value={bookingData.totalAmount}
                                onChange={(e) => setBookingData({ ...bookingData, totalAmount: parseFloat(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="specialRequests" className="text-right">
                                Special Requests
                            </Label>
                            <Input
                                id="specialRequests"
                                value={bookingData.specialRequests}
                                onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Booking</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

