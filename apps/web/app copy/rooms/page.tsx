import { Metadata } from "next";
import { RoomList } from "@/components/rooms/room-list";

export const metadata: Metadata = {
  title: "Rooms | LuxStay",
  description: "Browse our luxurious rooms and suites",
};

export default function RoomsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Our Rooms</h1>
      <RoomList />
    </div>
  );
}