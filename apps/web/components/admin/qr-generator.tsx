"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Input } from "@/apps/web/components/ui/input";
import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export function QrGenerator()
{
    const [bookingId, setBookingId] = useState("");
    const qrValue = bookingId ?
        JSON.stringify({
            bookingId,
            timestamp: Date.now(),
            type: "check-in"
        }) : "";

    const handleDownload = () =>
    {
        const svg = document.getElementById("qr-code");
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () =>
            {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `checkin-${bookingId}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            };
            img.src = "data:image/svg+xml;base64," + btoa(svgData);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Generate Check-in QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input
                        placeholder="Enter booking ID"
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                    />
                </div>
                {qrValue && (
                    <div className="flex flex-col items-center space-y-4">
                        <QRCodeSVG
                            id="qr-code"
                            value={qrValue}
                            size={200}
                            level="H"
                            includeMargin
                        />
                        <Button onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            Download QR Code
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}