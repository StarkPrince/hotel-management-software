"use client";

import type { Room } from "@prisma/client";
import { useEffect, useState } from "react";
import { RoomCard } from "./room-card";

export function RoomList()
{
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        fetchRooms();
    }, []);

    const fetchRooms = async () =>
    {
        try {
            const response = await fetch("/api/rooms");
            if (response.ok) {
                const data = await response.json();
                setRooms(data);
            }
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading rooms...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
}