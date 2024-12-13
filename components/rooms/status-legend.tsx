import { RoomStatus } from "@prisma/client";

const statusColors: Record<RoomStatus, string> = {
  AVAILABLE: "bg-green-500",
  OCCUPIED: "bg-red-500",
  MAINTENANCE: "bg-yellow-500",
  CLEANING: "bg-blue-500",
};

export function StatusLegend() {
  return (
    <div className="flex gap-4">
      {Object.entries(statusColors).map(([status, color]) => (
        <div key={status} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <span className="text-sm">{status}</span>
        </div>
      ))}
    </div>
  );
}