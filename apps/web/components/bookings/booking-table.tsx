import { Badge } from "@/apps/web/components/ui/badge";
import
  {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/apps/web/components/ui/table";
import mockDb from "@/apps/web/data/mock-db.json";
import { getBookingRoom, getBookingStatus } from "@/apps/web/lib/utils/booking";
import { formatDate } from "@/apps/web/lib/utils/date";
import { Booking } from "@/apps/web/types";

interface BookingTableProps
{
  bookings: Booking[];
}

export function BookingTable({ bookings }: BookingTableProps)
{
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