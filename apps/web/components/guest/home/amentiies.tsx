"use client";

import { AmenityCard } from "@/apps/web/components/guest/home/amenity-card";
import { Car, GlassWater, Utensils, Wifi } from "lucide-react";

const amenities = [
    {
        icon: Wifi,
        title: "High-Speed WiFi",
        description: "Stay connected with complimentary high-speed internet access"
    },
    {
        icon: Utensils,
        title: "Fine Dining",
        description: "Experience culinary excellence at our restaurants"
    },
    {
        icon: Car,
        title: "Valet Parking",
        description: "Complimentary valet parking for all guests"
    },
    {
        icon: GlassWater,
        title: "Infinity Pool",
        description: "Relax in our rooftop infinity pool with city views"
    }
];

export function HomeAmenities()
{
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {amenities.map((amenity) => (
                        <AmenityCard key={amenity.title} {...amenity} />
                    ))}
                </div>
            </div>
        </section>
    );
}