"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/apps/web/components/ui/card";
import
{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/apps/web/components/ui/form";
import { Input } from "@/apps/web/components/ui/input";
import { Switch } from "@/apps/web/components/ui/switch";
import { toast } from "@/apps/web/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    emailNotifications: z.boolean(),
    smsNotifications: z.boolean(),
    bookingConfirmations: z.boolean(),
    bookingReminders: z.boolean(),
    maintenanceAlerts: z.boolean(),
    lowInventoryAlerts: z.boolean(),
    reminderHours: z.number().min(1).max(72),
});

export function NotificationSettings()
{
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailNotifications: true,
            smsNotifications: false,
            bookingConfirmations: true,
            bookingReminders: true,
            maintenanceAlerts: true,
            lowInventoryAlerts: true,
            reminderHours: 24,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>)
    {
        toast({
            title: "Settings updated",
            description: "Your notification settings have been saved successfully.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="emailNotifications"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Email Notifications</FormLabel>
                                            <FormDescription>
                                                Receive notifications via email
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="smsNotifications"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>SMS Notifications</FormLabel>
                                            <FormDescription>
                                                Receive notifications via SMS
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="reminderHours"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reminder Hours</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Hours before check-in to send reminders
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit">Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}