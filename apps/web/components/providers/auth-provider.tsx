"use client";

import { User } from '@prisma/client';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType
{
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode })
{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        checkAuth();
    }, []);

    const checkAuth = async () =>
    {
        try {
            const response = await fetch('/api/auth/check');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) =>
    {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        setUser(data.user);
    };

    const logout = async () =>
    {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);