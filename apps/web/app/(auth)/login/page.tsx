"use client";

import { Button } from '@/apps/web/components/ui/button';
import { Card } from '@/apps/web/components/ui/card';
import { Input } from '@/apps/web/components/ui/input';
import { useToast } from '@/apps/web/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();

            if (data.role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Invalid credentials",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
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
            </Card>
        </div>
    );
}