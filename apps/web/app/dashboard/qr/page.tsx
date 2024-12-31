"use client";

import { QrGenerator } from "@/apps/web/components/admin/qr-generator";

export default function QrGeneratorPage()
{
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">QR Code Generator</h1>
            <div className="max-w-md">
                <QrGenerator />
            </div>
        </div>
    );
}