import { Booking } from "@prisma/client";
import { atom } from "recoil";

export interface BookingWithDetails extends Booking {
  user: {
    id: string;
    name: string | null;
    email: string;
  };
  room: {
    number: string;
    type: string;
  };
}

export const bookingsState = atom<BookingWithDetails[]>({
  key: "bookingsState",
  default: [],
});

export const selectedBookingState = atom<BookingWithDetails | null>({
  key: "selectedBookingState",
  default: null,
});
