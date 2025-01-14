import { Shift, Assignment } from "@/types/staff";

export const getStatusColor = (status: string): "default" | "warning" | "success" | "destructive" => {
  const colors = {
    SCHEDULED: "default",
    PENDING: "warning",
    COMPLETED: "success",
    CANCELLED: "destructive",
    OPEN: "default",
    IN_PROGRESS: "warning",
    ACTIVE: "default",
    INACTIVE: "destructive",
  } as const;
  
  return colors[status as keyof typeof colors] || "default";
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${startTime} - ${endTime}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};