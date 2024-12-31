"use client";

import { BookingSettings } from "@/apps/web/components/admin/settings/booking-settings";
import { GeneralSettings } from "@/apps/web/components/admin/settings/general-settings";
import { NotificationSettings } from "@/apps/web/components/admin/settings/notification-settings";
import { SecuritySettings } from "@/apps/web/components/admin/settings/security-settings";
import { SystemSettings } from "@/apps/web/components/admin/settings/system-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/apps/web/components/ui/tabs";

export default function SettingsPage()
{
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your hotel system settings</p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="booking">Booking</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <GeneralSettings />
                </TabsContent>

                <TabsContent value="booking">
                    <BookingSettings />
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationSettings />
                </TabsContent>

                <TabsContent value="security">
                    <SecuritySettings />
                </TabsContent>

                <TabsContent value="system">
                    <SystemSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}