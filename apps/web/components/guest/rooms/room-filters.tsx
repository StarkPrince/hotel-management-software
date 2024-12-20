"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import { Checkbox } from "@/apps/web/components/ui/checkbox";
import { Label } from "@/apps/web/components/ui/label";
import { Slider } from "@/apps/web/components/ui/slider";
import { useState } from "react";

export function RoomFilters()
{
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [filters, setFilters] = useState({
        wifi: false,
        breakfast: false,
        parking: false,
        pool: false,
    });

    const handleFilterChange = (key: keyof typeof filters) =>
    {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                    <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="space-y-2">
                        {Object.entries(filters).map(([key, value]) => (
                            <div key={key} className="flex items-center">
                                <Checkbox
                                    id={key}
                                    checked={value}
                                    onCheckedChange={() => handleFilterChange(key as keyof typeof filters)}
                                />
                                <Label htmlFor={key} className="ml-2 capitalize">
                                    {key}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
            </div>
        </Card>
    );
}