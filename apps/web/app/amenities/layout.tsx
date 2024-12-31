"use client";

import { SessionTimer } from "@/apps/web/components/ui/session-timer";
import { useSession } from "@/apps/web/hooks/use-session";

export default function AmenitiesLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    const { session, loading } = useSession();

    return (
        <div className="container py-10">
            {!loading && session && <SessionTimer />}
            <div className="mt-6">{children}</div>
        </div>
    );
}