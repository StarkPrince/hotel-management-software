'use client'

import { Badge } from "@/apps/web/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card"
import mockDb from "@/apps/web/data/mock-db.json"
import { AnimatePresence, motion } from "framer-motion"
import { Clock, MapPin } from 'lucide-react'
import Image from "next/image"
import { useMemo, useState } from "react"
import { AmenityFilter } from "./amenity-filter"

export function AmenityList()
{
  const [amenities] = useState(mockDb.amenities)
  const [activeFilter, setActiveFilter] = useState("All")

  const categories: string[] = useMemo(() =>
  {
    const allCategories = amenities.map((amenity) => amenity.category as string)
    return [...new Set(allCategories)]
  }, [amenities])

  const filteredAmenities = useMemo(() =>
  {
    return activeFilter === "All"
      ? amenities
      : amenities.filter((amenity) => amenity.category === activeFilter)
  }, [amenities, activeFilter])

  return (
    <>
      <AmenityFilter categories={categories} onFilterChange={setActiveFilter} />
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredAmenities.map((amenity, index) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-56 w-full">
                  <Image
                    src={amenity.imageUrl as string}
                    alt={amenity.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl font-semibold">{amenity.name}</CardTitle>
                    <Badge
                      variant={amenity.status === "OPERATIONAL" ? "default" : "secondary"}
                      className="text-xs font-medium px-2 py-1"
                    >
                      {amenity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{amenity.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{amenity.openingHours}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{amenity.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

