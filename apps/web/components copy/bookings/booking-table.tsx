import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types";
import { formatDate } from "@/lib/utils/date";
import { getBookingRoom, getBookingStatus } from "@/lib/utils/booking";
import mockDb from "@/data/mock-db.json";

interface BookingTableProps {
  bookings: Booking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              No bookings found
            </TableCell>
          </TableRow>
        ) : (
          bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                Room {getBookingRoom(booking, mockDb.rooms)?.number}
              </TableCell>
              <TableCell>{formatDate(booking.checkIn)}</TableCell>
              <TableCell>{formatDate(booking.checkOut)}</TableCell>
              <TableCell>
                <Badge variant={getBookingStatus(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>${booking.totalPrice}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}