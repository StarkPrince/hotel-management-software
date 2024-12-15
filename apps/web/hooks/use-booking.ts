import axios from "axios";
import { useEffect, useState } from "react";

export const useBookings = () => {
  const [bookings, setBookings] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/bookings");
        setBookings(response.data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const createBooking = async (bookingData: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/bookings",
        bookingData
      );
      setBookings([...bookings, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/bookings/${bookingId}/status`,
        { status }
      );
      setBookings(
        bookings.map((booking: any) =>
          booking.id === bookingId ? response.data : booking
        )
      );
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  return { bookings, isLoading, error, createBooking, updateBookingStatus };
};
