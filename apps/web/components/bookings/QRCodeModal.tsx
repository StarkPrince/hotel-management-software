"use client";

import { Button } from '@/apps/web/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/apps/web/components/ui/dialog';
import { useToast } from '@/apps/web/hooks/use-toast';
import { BookingWithDetails } from '@/apps/web/lib/store/atoms/bookingAtom';
import Image from 'next/image';
import { useState } from 'react';

interface QRCodeModalProps
{
  booking: BookingWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ booking, isOpen, onClose }: QRCodeModalProps)
{
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateQR = async () =>
  {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}/qr`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to generate QR code');

      const data = await response.json();

      toast({
        title: "QR Code Generated",
        description: "The QR code has been generated successfully.",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Check-in QR Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm space-y-2">
            <p><strong>Guest:</strong> {booking.user.name}</p>
            <p><strong>Room:</strong> {booking.room.number}</p>
            <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
          </div>

          {booking.qrCode ? (
            <div className="flex justify-center">
              <Image
                src={booking.qrCode}
                alt="Check-in QR Code"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <Button
              onClick={handleGenerateQR}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate QR Code"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}