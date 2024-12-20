"use client";

import { Card } from "@/apps/web/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AmenityCardProps
{
    icon: LucideIcon;
    title: string;
    description: string;
}

export function AmenityCard({ icon: Icon, title, description }: AmenityCardProps)
{
    return (
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Icon className="mx-auto h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </Card>
    );
}