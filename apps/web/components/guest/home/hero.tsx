"use client";

import { Button } from "@/apps/web/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeHero()
{
    return (
        <section className="relative h-[600px] flex items-center justify-center text-white">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Luxury Living</h1>
                <p className="text-xl mb-8">Experience comfort and elegance at its finest</p>
                <Link href="/rooms">
                    <Button size="lg" className="font-semibold">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}