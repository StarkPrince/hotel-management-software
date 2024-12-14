"use client"

import { externalBookingColumns } from "@/components/bookings/external-columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchExternalBookings } from "@/lib/api"
import { ExternalBooking } from "@/types"
import { useEffect, useState } from "react"

const platforms = ["BOOKING_COM", "MAKEMYTRIP", "GOIBIBO", "EXPEDIA", "AIRBNB"]

export default function ExternalBookingsPage()
{
    const [bookings, setBookings] = useState<ExternalBooking[]>([])
    const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL")

    useEffect(() =>
    {
        const loadExternalBookings = async () =>
        {
            const data = await fetchExternalBookings()
            setBookings(data)
        }
        loadExternalBookings()
    }, [])

    const filteredBookings = selectedPlatform === "ALL"
        ? bookings
        : bookings.filter(booking => booking.source === selectedPlatform)

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">External Platform Bookings</h1>
            <Tabs defaultValue="ALL" onValueChange={setSelectedPlatform}>
                <TabsList>
                    <TabsTrigger value="ALL">All Platforms</TabsTrigger>
                    {platforms.map(platform => (
                        <TabsTrigger key={platform} value={platform}>
                            {platform.replace("_", ".")}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={selectedPlatform}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Bookings from {selectedPlatform === "ALL" ? "All Platforms" : selectedPlatform.replace("_", ".")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={externalBookingColumns} data={filteredBookings} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

