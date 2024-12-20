"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface QrScannerProps
{
    onClose: () => void;
}

export function QrScanner({ onClose }: QrScannerProps)
{
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() =>
    {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () =>
    {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            toast.error("Failed to access camera");
        }
    };

    const stopCamera = () =>
    {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <Card className="w-[90vw] max-w-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Scan QR Code</h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Position the QR code within the frame to scan
                    </p>
                </Card>
            </div>
        </div>
    );
}