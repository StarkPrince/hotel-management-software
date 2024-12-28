"use client";

import BookingManagement from "@/apps/web/components/admin/booking-management";
import MaintenanceManagement from "@/apps/web/components/admin/maintenance-management";
import AdminOverview from "@/apps/web/components/admin/overview";
import RoomManagement from "@/apps/web/components/admin/room-management";
import StaffManagement from "@/apps/web/components/admin/staff-management";
import TaskManagement from "@/apps/web/components/admin/task-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/apps/web/components/ui/tabs";
import { useState } from "react";

export default function AdminDashboard()
{
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <AdminOverview />
        </TabsContent>

        <TabsContent value="rooms" className="mt-6">
          <RoomManagement />
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <StaffManagement />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <MaintenanceManagement />
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <BookingManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}