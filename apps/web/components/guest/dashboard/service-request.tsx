"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import { Input } from "@/apps/web/components/ui/input";
import { Textarea } from "@/apps/web/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function ServiceRequests()
{
    const [request, setRequest] = useState({ type: "", description: "" });

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                toast.success("Service request submitted successfully");
                setRequest({ type: "", description: "" });
            }
        } catch (error) {
            toast.error("Failed to submit service request");
        }
    };

    return (
        <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input
                        placeholder="Request Type (e.g., Room Service, Maintenance)"
                        value={request.type}
                        onChange={(e: any) => setRequest({ ...request, type: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Textarea
                        placeholder="Description"
                        value={request.description}
                        onChange={(e: any) => setRequest({ ...request, description: e.target.value })}
                        required
                    />
                </div>
                <Button type="submit">Submit Request</Button>
            </form>
        </Card>
    );
}