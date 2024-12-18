"use client"

import { createBooking, fetchBookings } from "@/apps/web/api"
import { AddBookingDialog } from "@/apps/web/components/bookings/add-booking-dialog"
import { bookingColumns } from "@/apps/web/components/bookings/columns"
import { Button } from "@/apps/web/components/ui/button"
import { Card } from "@/apps/web/components/ui/card"
import { DataTable } from "@/apps/web/components/ui/data-table"
import { Booking } from "@/apps/web/types"
import { Plus } from 'lucide-react'
import { useEffect, useState } from "react"

export default function BookingsPage()
{
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isAddBookingDialogOpen, setIsAddBookingDialogOpen] = useState(false)

  useEffect(() =>
  {
    const loadBookings = async () =>
    {
      const data = await fetchBookings()
      setBookings(data)
    }
    loadBookings()
  }, [])

  const handleAddBooking = async (bookingData: any) =>
  {
    try {
      const newBooking = await createBooking(bookingData)
      setBookings([...bookings, newBooking])
      setIsAddBookingDialogOpen(false)
    } catch (error) {
      console.error("Failed to add booking:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <Button onClick={() => setIsAddBookingDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>
      <Card className="p-6">
        <DataTable columns={bookingColumns} data={bookings} />
      </Card>
      <AddBookingDialog
        isOpen={isAddBookingDialogOpen}
        onClose={() => setIsAddBookingDialogOpen(false)}
        onAddBooking={handleAddBooking}
      />
    </div>
  )
}

