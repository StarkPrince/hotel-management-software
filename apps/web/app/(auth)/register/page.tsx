"use client";

import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import { Input } from "@/apps/web/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage()
{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Registration successful");
                router.push("/login");
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                    />
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}