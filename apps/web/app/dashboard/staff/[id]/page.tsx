"use client";

import { StaffAssignments } from "@/apps/web/components/dashboard/staff/staff-assignments";
import { StaffShifts } from "@/apps/web/components/dashboard/staff/staff-shifts";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/apps/web/components/ui/tabs";
import mockDb from "@/apps/web/data/mock-db.json";
import { StaffMember } from "@/apps/web/types/staff";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StaffDetailPage({ params }: { params: { id: string } })
{
    const [staff, setStaff] = useState<StaffMember | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultTab = searchParams.get('tab') || 'shifts';

    useEffect(() =>
    {
        const staffMember = mockDb.users.find(u => u.id === params.id);
        // if (staffMember) {
        //     setStaff({
        //         ...staffMember,
        //         status: 'ACTIVE'
        //     });
        // }
    }, [params.id]);

    if (!staff) {
        return <div className="flex items-center justify-center h-[50vh]">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold">{staff.name}</h1>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Staff Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                            <dd className="text-lg">{staff.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                            <dd className="text-lg">{staff.role}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Tabs defaultValue={defaultTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="shifts">Shifts</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>

                <TabsContent value="shifts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shift Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StaffShifts staffId={staff.id} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="assignments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks & Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StaffAssignments staff={staff} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}