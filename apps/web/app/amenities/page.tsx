import { AmenityList } from "@/apps/web/components/amenities/amenity-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amenities | LuxStay",
  description: "Explore our luxury hotel amenities",
};

export default function AmenitiesPage()
{
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Hotel Amenities</h1>
      <AmenityList />
    </div>
  );
}