"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import mockDb from "@/data/mock-db.json";
import Image from "next/image";

export function AmenityList() {
  const [amenities] = useState(mockDb.amenities);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {amenities.map((amenity) => (
        <Card key={amenity.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={amenity.imageUrl}
              alt={amenity.name}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{amenity.name}</CardTitle>
              <Badge variant={amenity.status === "OPERATIONAL" ? "default" : "secondary"}>
                {amenity.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-muted-foreground">{amenity.description}</p>
              <div className="space-y-1">
                <p className="text-sm font-medium">Opening Hours:</p>
                <p className="text-sm text-muted-foreground">{amenity.openingHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}