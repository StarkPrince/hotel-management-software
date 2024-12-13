import { BookingSchema } from '@/lib/types';

export async function getBookings() {
  const response = await fetch('http://localhost:3001/api/bookings');
  const data = await response.json();
  return data;
}

export async function createBooking(booking: unknown) {
  const validatedBooking = BookingSchema.parse(booking);
  const response = await fetch('http://localhost:3001/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedBooking),
  });
  return response.json();
}