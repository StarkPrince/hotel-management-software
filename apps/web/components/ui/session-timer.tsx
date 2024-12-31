"use client";

import { Card, CardContent } from "@/apps/web/components/ui/card";
import { Progress } from "@/apps/web/components/ui/progress";
import { useSession } from "@/apps/web/hooks/use-session";
import { useEffect, useState } from "react";

export function SessionTimer()
{
    const { session } = useSession();
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [progress, setProgress] = useState<number>(100);

    useEffect(() =>
    {
        if (session?.expiresAt) {
            const expiresAt = new Date(session.expiresAt);
            const createdAt = new Date(session.createdAt);
            const totalDuration = expiresAt.getTime() - createdAt.getTime();

            const timer = setInterval(() =>
            {
                const now = new Date();
                const remaining = expiresAt.getTime() - now.getTime();
                const percentage = (remaining / totalDuration) * 100;

                setTimeLeft(Math.max(0, remaining));
                setProgress(Math.max(0, percentage));

                if (remaining <= 0) {
                    clearInterval(timer);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [session]);

    if (!session?.expiresAt) return null;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <Card className="bg-primary/5">
            <CardContent className="pt-6">
                <div className="space-y-2">
                    <p className="text-sm font-medium">Session Time Remaining</p>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                        {days}d {hours}h {minutes}m remaining
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}