import { selector } from "recoil";
import { bookingsState } from "../atoms/bookingAtom";

export const activeBookingsSelector = selector({
  key: "activeBookingsSelector",
  get: ({ get }) => {
    const bookings = get(bookingsState);
    return bookings.filter(
      (booking) =>
        booking.status === "CONFIRMED" || booking.status === "CHECKED_IN"
    );
  },
});

export const bookingsByStatusSelector = selector({
  key: "bookingsByStatusSelector",
  get: ({ get }) => {
    const bookings = get(bookingsState);
    return {
      confirmed: bookings.filter((b) => b.status === "CONFIRMED"),
      checkedIn: bookings.filter((b) => b.status === "CHECKED_IN"),
      checkedOut: bookings.filter((b) => b.status === "CHECKED_OUT"),
      cancelled: bookings.filter((b) => b.status === "CANCELLED"),
    };
  },
});
