export const getStatusColor = (
  status: string
): "default" | "destructive" | "outline" | "secondary" | null | undefined => {
  const colors = {
    SCHEDULED: "default",
    PENDING: "outline",
    COMPLETED: "default",
    CANCELLED: "destructive",
    OPEN: "default",
    IN_PROGRESS: "outline",
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
