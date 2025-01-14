"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scan, StopCircle } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface QrScannerProps {
  isScanning: boolean;
  onScan: (data: string | null) => void;
  onToggle: () => void;
}

export function QrScanner({ isScanning, onScan, onToggle }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef(new BrowserQRCodeReader());
  const [otp, setOtp] = useState("");
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    let controls: any;

    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoDevice = devices.some(device => device.kind === 'videoinput');
        setHasCamera(hasVideoDevice);
      } catch (error) {
        console.error("Error checking camera:", error);
        setHasCamera(false);
      }
    };

    const startScanning = async () => {
      if (isScanning && videoRef.current) {
        try {
          controls = await codeReader.current.decodeFromVideoDevice(
            undefined,
            videoRef.current,
            (result) => {
              if (result) {
                onScan(result.getText());
                onToggle();
              }
            }
          );
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCamera(false);
        }
      }
    };

    checkCamera();
    if (isScanning && hasCamera) {
      startScanning();
    }

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [isScanning, onScan, onToggle, hasCamera]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan(JSON.stringify({ otp }));
  };

  return (
    <div className="space-y-4">
      {hasCamera ? (
        <>
          <Card className="relative aspect-square max-w-sm mx-auto overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Card>
          <Button
            onClick={onToggle}
            className="w-full"
            variant={isScanning ? "destructive" : "default"}
          >
            {isScanning ? (
              <>
                <StopCircle className="mr-2 h-4 w-4" /> Stop Scanning
              </>
            ) : (
              <>
                <Scan className="mr-2 h-4 w-4" /> Start Scanning
              </>
            )}
          </Button>
        </>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP provided"
              maxLength={6}
            />
          </div>
          <Button type="submit" className="w-full">Submit OTP</Button>
        </div>
      )}
    </div>
  );
}