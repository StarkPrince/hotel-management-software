import { Card } from "@/apps/web/components/ui/card";
import { Badge } from "@/apps/web/components/ui/badge";
import { RoomStatus } from "@prisma/client";

interface RoomCardProps
{
  number: string;
  status: RoomStatus;
  onClick?: () => void;
}

const statusColors: Record<RoomStatus, string> = {
  AVAILABLE: "bg-green-500",
  OCCUPIED: "bg-red-500",
  MAINTENANCE: "bg-yellow-500",
  CLEANING: "bg-blue-500",
};

export function RoomCard({ number, status, onClick }: RoomCardProps)
{
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">Room {number}</span>
        <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
      </div>
      <Badge variant="outline" className="mt-2">
        {status}
      </Badge>
    </Card>
  );
}