"use client";

import { Button } from '@/apps/web/components/ui/button';
import { Card } from '@/apps/web/components/ui/card';
import { BookingWithDetails, selectedBookingState } from '@/apps/web/lib/store/atoms/bookingAtom';
import { bookingsByStatusSelector } from '@/apps/web/lib/store/selectors/bookingSelectors';
import { QrCode } from 'lucide-react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { QRCodeModal } from './QRCodeModal';

export function BookingList()
{
    const bookingsByStatus = useRecoilValue(bookingsByStatusSelector);
    const setSelectedBooking = useSetRecoilState(selectedBookingState);
    const [qrModalBooking, setQrModalBooking] = useState<BookingWithDetails | null>(null);

    const handleGenerateQR = (booking: BookingWithDetails) =>
    {
        setQrModalBooking(booking);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                {Object.entries(bookingsByStatus).map(([status, bookings]) => (
                    bookings.length > 0 && (
                        <div key={status} className="space-y-4">
                            <h2 className="text-lg font-semibold capitalize">{status}</h2>
                            {bookings.map((booking) => (
                                <Card key={booking.id} className="p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{booking.user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Room {booking.room.number} • {booking.room.type}
                                            </p>
                                            <p className="text-sm">
                                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {(booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN') && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleGenerateQR(booking)}
                                                >
                                                    <QrCode className="h-4 w-4 mr-2" />
                                                    QR Code
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )
                ))}
            </div>

            {qrModalBooking && (
                <QRCodeModal
                    booking={qrModalBooking}
                    isOpen={true}
                    onClose={() => setQrModalBooking(null)}
                />
            )}
        </div>
    );
}