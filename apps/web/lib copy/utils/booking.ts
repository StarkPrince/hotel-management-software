import { Booking, Room } from "@/types";

export const getBookingRoom = (booking: Booking, rooms: Room[]): Room | undefined => {
  return rooms.find((r) => r.id === booking.roomId);
};

export const getBookingStatus = (status: string): "default" | "secondary" => {
  return status === "ACTIVE" ? "default" : "secondary";
};