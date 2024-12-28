import { getBookingRoom, getBookingStatus } from "@/apps/web/lib/utils/booking";
import { Room, RoomStatus } from "@/apps/web/types";

describe("Booking Utils", () => {
  const mockRooms: Room[] = [
    {
      id: "1",
      number: "101",
      type: "STANDARD",
      status: RoomStatus.AVAILABLE,
      floor: 1,
      price: 199.99,
      amenities: ["WiFi"],
      imageUrl: "test.jpg",
    },
  ];

  describe("getBookingRoom", () => {
    it("returns correct room for valid booking", () => {
      const booking = { roomId: "1" };
      const room = getBookingRoom(booking as any, mockRooms);
      expect(room).toEqual(mockRooms[0]);
    });

    it("returns undefined for invalid room id", () => {
      const booking = { roomId: "invalid" };
      const room = getBookingRoom(booking as any, mockRooms);
      expect(room).toBeUndefined();
    });
  });

  describe("getBookingStatus", () => {
    it("returns default for ACTIVE status", () => {
      expect(getBookingStatus("ACTIVE")).toBe("default");
    });

    it("returns secondary for non-ACTIVE status", () => {
      expect(getBookingStatus("PENDING")).toBe("secondary");
      expect(getBookingStatus("COMPLETED")).toBe("secondary");
    });
  });
});
