```tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRGenerator } from "./qr-generator";

interface BookingQRDetailsProps {
  booking: {
    id: string;
    checkOut: string;
    room: {
      number: string;
    };
  };
}

export function BookingQRDetails({ booking }: BookingQRDetailsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Room Number</dt>
              <dd className="text-lg">{booking.room.number}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Check-out</dt>
              <dd className="text-lg">{new Date(booking.checkOut).toLocaleDateString()}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <QRGenerator
        bookingId={booking.id}
        checkOut={booking.checkOut}
        roomNumber={booking.room.number}
      />
    </div>
  );
}
```