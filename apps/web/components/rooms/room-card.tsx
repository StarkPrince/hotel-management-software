"use client";

import { Badge } from "@/apps/web/components/ui/badge";
import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import { Room } from "@/apps/web/types";
import Image from "next/image";
import Link from "next/link";

interface RoomCardProps
{
  room: Room;
}

export function RoomCard({ room }: RoomCardProps)
{
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={room.imageUrl}
          alt={`Room ${room.number}`}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Room {room.number}</CardTitle>
          <Badge variant={room.status === "AVAILABLE" ? "default" : "secondary"}>
            {room.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">${room.price}/night</p>
          <p className="text-muted-foreground">{room.type}</p>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <Badge key={amenity} variant="outline">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/rooms/${room.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}