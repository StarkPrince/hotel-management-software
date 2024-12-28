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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingTable bookings={bookings} />
        </CardContent>
      </Card>
    </div>
  );
}