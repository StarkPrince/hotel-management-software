"use client";

import { BookingManagementTable } from "@/apps/web/components/dashboard/bookings/booking-management-table";
import { BookingStats } from "@/apps/web/components/dashboard/bookings/booking-stats";
import { RecentBookings } from "@/apps/web/components/dashboard/bookings/recent-bookings";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Plus } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function BookingsPage()
{
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Booking Management</h1>
        <Button size="sm" onClick={() => router.push("/dashboard/bookings/new")}>
          <Plus className="mr-1 h-3 w-3" /> New Booking
        </Button>
      </div>

      <BookingStats />

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm">All Bookings</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <BookingManagementTable />
            </CardContent>
          </Card>
        </div>
        <div>
          <RecentBookings />
        </div>
      </div>
    </div>
  );
}

