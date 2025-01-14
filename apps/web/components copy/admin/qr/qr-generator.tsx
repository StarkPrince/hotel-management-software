"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { generateOTP } from "@/lib/utils/otp";

interface QRGeneratorProps {
  bookingId: string;
  checkOut: string;
  roomNumber: string;
}

export function QRGenerator({ bookingId, checkOut, roomNumber }: QRGeneratorProps) {
  const [otp] = useState(() => generateOTP());
  
  const qrValue = JSON.stringify({
    bookingId,
    otp,
    checkOut,
    timestamp: Date.now(),
    type: "room-access"
  });

  const handleDownload = () => {
    const svg = document.getElementById("room-qr-code");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `room-${roomNumber}-access.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    const svgData = new XMLSerializer().serializeToString(svg);
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room {roomNumber} Access QR Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <QRCodeSVG
            id="room-qr-code"
            value={qrValue}
            size={200}
            level="H"
            includeMargin
          />
          <div className="text-sm text-muted-foreground">
            Valid until: {new Date(checkOut).toLocaleString()}
          </div>
          <div className="text-sm font-semibold">
            OTP: {otp}
          </div>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}