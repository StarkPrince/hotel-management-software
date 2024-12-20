"use client";

import { useAuth } from "@/apps/web/components/providers/auth-provider";
import { Button } from "@/apps/web/components/ui/button";
import { Card } from "@/apps/web/components/ui/card";
import { Input } from "@/apps/web/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Login successful");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </Card>
        </div>
    );
}