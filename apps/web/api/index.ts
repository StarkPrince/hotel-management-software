import { Room } from "@/apps/web/types";
import axios from "axios";
import { BASE_URL } from "../config";

export async function login(email: string, password: string) {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function fetchDashboardStats() {
  const response = await axios.get(`${BASE_URL}/dashboard/stats`);
  return response.data;
}

export async function fetchBookings() {
  const response = await axios.get(`${BASE_URL}/bookings`);
  return response.data;
}

export async function fetchRooms() {
  const response = await axios.get(`${BASE_URL}/rooms`);
  return response.data;
}

export async function fetchRevenueChart() {
  const response = await axios.get(`${BASE_URL}/dashboard/revenue-chart`);
  return response.data;
}

export async function createRoom(roomData: any) {
  const response = await axios.post(`${BASE_URL}/rooms`, roomData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function createBooking(bookingData: any) {
  const response = await axios.post(`${BASE_URL}/bookings`, bookingData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const response = await axios.put(
    `${BASE_URL}/bookings/${bookingId}/status`,
    { status },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function fetchExternalBookings() {
  const response = await axios.get(`${BASE_URL}/external-bookings/sync`);
  return response.data;
}

export async function fetchStaff() {
  const response = await axios.get(`${BASE_URL}/staff`);
  return response.data;
}

export async function createShift(shiftData: any) {
  const response = await axios.post(`${BASE_URL}/staff/shifts`, shiftData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function fetchTasks() {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
}

export async function createTask(taskData: any) {
  const response = await axios.post(`${BASE_URL}/tasks`, taskData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function updateTaskStatus(taskId: string, status: string) {
  const response = await axios.put(
    `${BASE_URL}/tasks/${taskId}/status`,
    { status },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function fetchMaintenance() {
  const response = await axios.get(`${BASE_URL}/maintenance`);
  return response.data;
}

export async function createMaintenance(maintenanceData: any) {
  const response = await axios.post(
    `${BASE_URL}/maintenance`,
    maintenanceData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function updateMaintenanceStatus(
  maintenanceId: string,
  status: string
) {
  const response = await axios.put(
    `${BASE_URL}/maintenance/${maintenanceId}/status`,
    { status },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function updateRoom(roomId: string, roomData: Partial<Room>) {
  const response = await axios.put(`${BASE_URL}/rooms/${roomId}`, roomData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
