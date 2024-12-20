import { RoomFilters } from "@/apps/web/components/guest/rooms/room-filters";
import { RoomList } from "@/apps/web/components/guest/rooms/room-list";

export default function RoomsPage()
{
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <RoomFilters />
                </aside>
                <main className="lg:col-span-3">
                    <RoomList />
                </main>
            </div>
        </div>
    );
}