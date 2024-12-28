"use client";

import { BookingTable } from "@/apps/web/components/bookings/booking-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { useBookings } from "@/apps/web/hooks/use-bookings";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookingsPage()
{
  const { user } = useAuth();
  const router = useRouter();
  const { bookings, isLoading, error } = useBookings();

  useEffect(() =>
  {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;
  if (isLoading) return <div className="text-center py-4 text-sm">Loading...</div>;
  if (error) return <div className="text-center py-4 text-sm text-red-500">Error: {error}</div>;

  return (
    <div className="container pl-6 pt-10">
      <h1 className="text-xl font-semibold mb-4">My Bookings</h1>

      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-sm font-medium">Booking History</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <BookingTable bookings={bookings} />
        </CardContent>
      </Card>
    </div>
  );
}

