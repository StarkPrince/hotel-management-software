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
    twoFactorAuth: z.boolean(),
    requireStaffPin: z.boolean(),
    autoLogout: z.boolean(),
    sessionTimeout: z.number().min(5).max(120),
    passwordExpiry: z.number().min(30).max(365),
    loginAttempts: z.number().min(3).max(10),
});

export function SecuritySettings()
{
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            twoFactorAuth: false,
            requireStaffPin: true,
            autoLogout: true,
            sessionTimeout: 30,
            passwordExpiry: 90,
            loginAttempts: 5,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>)
    {
        toast({
            title: "Settings updated",
            description: "Your security settings have been saved successfully.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="twoFactorAuth"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Two-Factor Authentication</FormLabel>
                                            <FormDescription>
                                                Require 2FA for admin access
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
                                name="requireStaffPin"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel>Staff PIN Required</FormLabel>
                                            <FormDescription>
                                                Require PIN for staff actions
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
                                name="sessionTimeout"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Session Timeout (minutes)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Time before automatic logout
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="loginAttempts"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Login Attempts</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Number of failed attempts before account lockout
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