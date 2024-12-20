"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import type { Booking } from "@prisma/client";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

interface BookingCardProps
{
    booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps)
{
    return (
        <Card className="p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Room {booking.roomId}</h3>
                    <p className="text-muted-foreground">
                        Booking ID: {booking.id.slice(0, 8)}
                    </p>
                </div>
                <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {booking.status}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(booking.checkIn), "MMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{format(new Date(booking.checkOut), "MMM dd, yyyy")}</span>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p className="font-semibold">Total: ${booking.totalAmount}</p>
                <Button variant="outline" size="sm">
                    View Details
                </Button>
            </div>
        </Card>
    );
}