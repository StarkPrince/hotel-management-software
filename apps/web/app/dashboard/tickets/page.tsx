"use client";

import { CreateTicketForm } from "@/apps/web/components/tickets/create-ticket-form";
import { TicketList } from "@/apps/web/components/tickets/ticket-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import mockDb from "@/apps/web/data/mock-db.json";
import { useAuth } from "@/apps/web/hooks/use-auth";
import { Ticket } from "@/apps/web/types/ticket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function TicketsPage()
{
    const { user } = useAuth();
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() =>
    {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        // In a real app, this would be an API call
        // For now, simulate different views based on user role
        if (user.role === "GUEST") {
            // Filter tickets for the current user
            const userTickets = mockDb.tickets.filter(t => t.createdBy === user.id) as unknown as Ticket[];
            setTickets(userTickets);
        } else {
            // Admin, Manager, and Staff see all tickets
            setTickets(mockDb.tickets as unknown as Ticket[]);
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="container py-10">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">
                    {user.role === "GUEST" ? "Service Requests" : "Ticket Management"}
                </h1>

                <div className="grid gap-6 md:grid-cols-2">
                    {user.role === "GUEST" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Request</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CreateTicketForm />
                            </CardContent>
                        </Card>
                    )}

                    <Card className={user.role === "GUEST" ? "md:col-span-1" : "md:col-span-2"}>
                        <CardHeader>
                            <CardTitle>
                                {user.role === "GUEST" ? "My Requests" : "All Tickets"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TicketList tickets={tickets} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}