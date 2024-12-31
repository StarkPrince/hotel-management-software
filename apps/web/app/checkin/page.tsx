"use client";

import { QrScanner } from "@/apps/web/components/checkin/qr-scanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { useToast } from "@/apps/web/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckInPage()
{
    const [isScanning, setIsScanning] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleScan = async (data: string | null) =>
    {
        if (data) {
            try {
                const response = await fetch("/api/auth/checkin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ qrCode: data }),
                });

                if (!response.ok) {
                    throw new Error("Check-in failed");
                }

                toast({
                    title: "Check-in successful!",
                    description: "Welcome to LuxStay. You now have access to all amenities.",
                });

                router.push("/amenities");
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Invalid QR code or check-in failed. Please try again.",
                });
            }
        }
    };

    return (
        <div className="container py-10">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Hotel Check-in</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            Please scan the QR code provided by the hotel staff to check in.
                        </p>
                        <QrScanner
                            isScanning={isScanning}
                            onScan={handleScan}
                            onToggle={() => setIsScanning(!isScanning)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}