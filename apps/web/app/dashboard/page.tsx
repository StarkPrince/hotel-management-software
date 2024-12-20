"use client";

import { BookingCard } from "@/apps/web/components/guest/dashboard/booking-card";
import { DashboardStats } from "@/apps/web/components/guest/dashboard/dashboard-stats";
import { QrScanner } from "@/apps/web/components/guest/dashboard/qr-scanner";
import { ServiceRequests } from "@/apps/web/components/guest/dashboard/service-request";
import { useAuth } from "@/apps/web/components/providers/auth-provider";
import { Button } from "@/apps/web/components/ui/button";
import type { Booking } from "@prisma/client";
import { useEffect, useState } from "react";
import Header from "../layout/header";

export default function DashboardPage()
{
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() =>
    {
        fetchBookings();
    }, []);

    const fetchBookings = async () =>
    {
        try {
            const response = await fetch("/api/bookings");
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
                    <Button onClick={() => setShowScanner(true)}>Scan QR Code</Button>
                </div>

                <DashboardStats />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Current Bookings</h2>
                        {bookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Service Requests</h2>
                        <ServiceRequests />
                    </div>
                </div>

                {showScanner && (
                    <QrScanner onClose={() => setShowScanner(false)} />
                )}
            </div>
        </>
    );
}