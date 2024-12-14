import { Room } from "@/types";

const BASE_URL = "http://localhost:4000/api";

export async function fetchDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
}

export async function fetchBookings() {
  const response = await fetch(`${BASE_URL}/bookings`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
}

export async function fetchRooms() {
  const response = await fetch(`${BASE_URL}/rooms`);
  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }
  return response.json();
}

export async function fetchRevenueChart() {
  const response = await fetch(`${BASE_URL}/dashboard/revenue-chart`);
  if (!response.ok) {
    throw new Error("Failed to fetch revenue chart data");
  }
  return response.json();
}

export async function createRoom(roomData: any) {
  const response = await fetch(`${BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });
  if (!response.ok) {
    throw new Error("Failed to create room");
  }
  return response.json();
}

export async function createBooking(bookingData: any) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) {
    throw new Error("Failed to create booking");
  }
  return response.json();
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update booking status");
  }
  return response.json();
}

export async function fetchExternalBookings() {
  const response = await fetch(`${BASE_URL}/external-bookings`);
  if (!response.ok) {
    throw new Error("Failed to fetch external bookings");
  }
  return response.json();
}

export async function fetchStaff() {
  const response = await fetch(`${BASE_URL}/staff`);
  if (!response.ok) {
    throw new Error("Failed to fetch staff");
  }
  return response.json();
}

export async function createShift(shiftData: any) {
  const response = await fetch(`${BASE_URL}/staff/shifts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shiftData),
  });
  if (!response.ok) {
    throw new Error("Failed to create shift");
  }
  return response.json();
}

export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

export async function createTask(taskData: any) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
}

export async function updateTaskStatus(taskId: string, status: string) {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update task status");
  }
  return response.json();
}

export async function fetchMaintenance() {
  const response = await fetch(`${BASE_URL}/maintenance`);
  if (!response.ok) {
    throw new Error("Failed to fetch maintenance requests");
  }
  return response.json();
}

export async function createMaintenance(maintenanceData: any) {
  const response = await fetch(`${BASE_URL}/maintenance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maintenanceData),
  });
  if (!response.ok) {
    throw new Error("Failed to create maintenance request");
  }
  return response.json();
}

export async function updateMaintenanceStatus(
  maintenanceId: string,
  status: string
) {
  const response = await fetch(
    `${BASE_URL}/maintenance/${maintenanceId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update maintenance status");
  }
  return response.json();
}

export async function updateRoom(roomId: string, roomData: Partial<Room>) {
  const response = await fetch(`${BASE_URL}/rooms/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });
  if (!response.ok) {
    throw new Error("Failed to update room");
  }
  return response.json();
}

export async function fetchAmenities() {
  const response = await fetch(`${BASE_URL}/amenities`);
  if (!response.ok) {
    throw new Error("Failed to fetch amenities");
  }
  return response.json();
}
