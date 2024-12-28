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

interface BookingTableProps
{
  bookings: any[]
}

export function BookingTable({ bookings }: BookingTableProps)
{
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Room</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-sm text-muted-foreground">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking: any) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  Room {getBookingRoom(booking, mockDb.rooms as any)?.number}
                </TableCell>
                <TableCell className="text-xs">{formatDate(booking.checkIn)}</TableCell>
                <TableCell className="text-xs">{formatDate(booking.checkOut)}</TableCell>
                <TableCell>
                  <Badge variant={getBookingStatus(booking.status)} className="text-xs">
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${booking.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

