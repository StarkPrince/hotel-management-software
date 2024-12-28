import mockDb from "@/apps/web/data/mock-db.json";
import { Booking } from "@/apps/web/types";
import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      try {
        const userBookings = mockDb.bookings.filter(
          (booking) => booking.userId === user.id
        );
        setBookings(userBookings);
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  return { bookings, isLoading, error };
};
