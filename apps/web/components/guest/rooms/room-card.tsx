"use client";

import { Badge } from "@/apps/web/components/ui/badge";
import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import type { Room } from "@prisma/client";
import { Bed, Maximize, Users } from "lucide-react";
import Link from "next/link";

interface RoomCardProps
{
    room: Room;
}

export function RoomCard({ room }: RoomCardProps)
{
    return (
        <Card className="overflow-hidden">
            <div className="aspect-video relative">
                <img
                    src={`https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=60`}
                    alt={`Room ${room.number}`}
                    className="object-cover w-full h-full"
                />
                <Badge className="absolute top-4 right-4">
                    {room.status}
                </Badge>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Room {room.number}</h3>
                        <p className="text-2xl font-bold">${room.price}/night</p>
                    </div>
                    <Badge variant="secondary">{room.type}</Badge>
                </div>

                <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>King Bed</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>2 Guests</span>
                    </div>
                    <div className="flex items-center">
                        <Maximize className="w-4 h-4 mr-1" />
                        <span>32 m²</span>
                    </div>
                </div>

                <Link href={`/rooms/${room.id}`}>
                    <Button className="w-full">View Details</Button>
                </Link>
            </div>
        </Card>
    );
}