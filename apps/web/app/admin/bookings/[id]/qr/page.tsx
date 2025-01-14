```tsx
"use client";

import { useEffect, useState } from "react";
import { BookingQRDetails } from "@/components/admin/qr/booking-qr-details";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import mockDb from "@/data/mock-db.json";

export default function BookingQRPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // In a real app, fetch from API
    const mockBooking = mockDb.bookings.find(b => b.id === params.id);
    if (mockBooking) {
      const room = mockDb.rooms.find(r => r.id === mockBooking.roomId);
      setBooking({
        ...mockBooking,
        room
      });
    }
  }, [params.id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bookings
        </Button>
        <h1 className="text-3xl font-bold">Room Access QR Code</h1>
      </div>

      <BookingQRDetails booking={booking} />
    </div>
  );
}
```