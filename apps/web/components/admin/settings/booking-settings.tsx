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
    FormMessage,
} from "@/apps/web/components/ui/form";
import { Input } from "@/apps/web/components/ui/input";
import { Switch } from "@/apps/web/components/ui/switch";
import { toast } from "@/apps/web/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    maxBookingDays: z.number().min(1),
    minAdvanceBookingDays: z.number().min(0),
    maxAdvanceBookingDays: z.number().min(1),
    allowOverbooking: z.boolean(),
    requireDeposit: z.boolean(),
    depositPercentage: z.number().min(0).max(100),
    autoConfirmBookings: z.boolean(),
    sendConfirmationEmails: z.boolean(),
});

export function BookingSettings()
{
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maxBookingDays: 30,
            minAdvanceBookingDays: 0,
            maxAdvanceBookingDays: 365,
            allowOverbooking: false,
            requireDeposit: true,
            depositPercentage: 20,
            autoConfirmBookings: false,
            sendConfirmationEmails: true,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>)
    {
        toast({
            title: "Settings updated",
            description: "Your booking settings have been saved successfully.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Booking Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="maxBookingDays"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Booking Days</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Maximum number of days for a single booking
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="depositPercentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deposit Percentage</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Required deposit as percentage of total booking cost
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="allowOverbooking"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Allow Overbooking</FormLabel>
                                            <FormDescription>
                                                Allow bookings even when rooms are fully occupied
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
                                name="requireDeposit"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Require Deposit</FormLabel>
                                            <FormDescription>
                                                Require deposit payment for booking confirmation
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
                                name="autoConfirmBookings"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Auto-confirm Bookings</FormLabel>
                                            <FormDescription>
                                                Automatically confirm bookings without manual review
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
                        </div>

                        <Button type="submit">Save Changes</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}