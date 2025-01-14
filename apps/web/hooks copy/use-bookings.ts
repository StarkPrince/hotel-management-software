import { useState, useEffect } from "react";
import { Booking } from "@/types";
import { useAuth } from "./use-auth";
import mockDb from "@/data/mock-db.json";

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