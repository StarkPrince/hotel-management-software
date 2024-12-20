"use client";

import ModeToggle from "@/apps/web/components/mode-toggle";
import { useAuth } from "@/apps/web/components/providers/auth-provider";
import { Button } from "@/apps/web/components/ui/button";
import { Hotel, User } from "lucide-react";
import Link from "next/link";

export default function Header()
{
    const { user, logout } = useAuth();

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Hotel className="h-6 w-6" />
                    <span className="font-bold text-xl">Luxury Hotel</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/amenities" className="hover:text-primary">
                        Amenities
                    </Link>
                    <Link href="/services" className="hover:text-primary">
                        Services
                    </Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="hover:text-primary">
                                Dashboard
                            </Link>
                            <Link href="/bookings" className="hover:text-primary">
                                My Bookings
                            </Link>
                        </>
                    ) : null}
                </nav>

                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/profile">
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button onClick={() => logout()} variant="outline">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}