'use client'

import { Button } from "@/apps/web/components/ui/button"
import { useState } from "react"

interface AmenityFilterProps
{
    categories: string[]
    onFilterChange: (category: string) => void
}

export function AmenityFilter({ categories, onFilterChange }: AmenityFilterProps)
{
    const [activeCategory, setActiveCategory] = useState("All")

    const handleCategoryClick = (category: string) =>
    {
        setActiveCategory(category)
        onFilterChange(category)
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
                variant={activeCategory === "All" ? "default" : "outline"}
                onClick={() => handleCategoryClick("All")}
            >
                All
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}

