import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookingTable } from "@/apps/web/components/bookings/booking-table";
import mockDb from "@/apps/web/data/mock-db.json";

const mockBookings = [
  {
    id: "1",
    roomId: "1",
    userId: "1",
    checkIn: "2024-03-20T14:00:00Z",
    checkOut: "2024-03-25T11:00:00Z",
    status: "ACTIVE",
    totalPrice: 1499.95,
  },
  {
    id: "2",
    roomId: "2",
    userId: "1",
    checkIn: "2024-04-01T14:00:00Z",
    checkOut: "2024-04-05T11:00:00Z",
    status: "PENDING",
    totalPrice: 999.95,
  },
];

describe("BookingTable", () =>
{
  it("renders all table headers correctly", () =>
  {
    render(<BookingTable bookings={mockBookings} />);

    const headers = ["Room", "Check In", "Check Out", "Status", "Total Price"];
    headers.forEach(header =>
    {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders booking data with correct formatting", () =>
  {
    render(<BookingTable bookings={mockBookings} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3); // Header + 2 bookings

    // Check first booking
    const firstRow = rows[1];
    expect(within(firstRow).getByText("Room 101")).toBeInTheDocument();
    expect(within(firstRow).getByText("ACTIVE")).toBeInTheDocument();
    expect(within(firstRow).getByText("$1499.95")).toBeInTheDocument();

    // Check date formatting
    expect(within(firstRow).getByText(/3\/20\/2024/)).toBeInTheDocument();
    expect(within(firstRow).getByText(/3\/25\/2024/)).toBeInTheDocument();
  });

  it("applies correct status badge styles", () =>
  {
    render(<BookingTable bookings={mockBookings} />);

    const activeBadge = screen.getByText("ACTIVE");
    const pendingBadge = screen.getByText("PENDING");

    expect(activeBadge).toHaveClass("bg-primary");
    expect(pendingBadge).toHaveClass("bg-secondary");
  });

  it("shows no bookings message when empty", () =>
  {
    render(<BookingTable bookings={[]} />);

    expect(screen.getByText("No bookings found")).toBeInTheDocument();
    expect(screen.queryByRole("row")).toHaveLength(1); // Just the header row
  });

  it("handles missing room data gracefully", () =>
  {
    const bookingsWithInvalidRoom = [{
      ...mockBookings[0],
      roomId: "invalid-id"
    }];

    render(<BookingTable bookings={bookingsWithInvalidRoom} />);

    expect(screen.getByText("Room")).toBeInTheDocument();
    expect(screen.queryByText("Room 101")).not.toBeInTheDocument();
  });
});