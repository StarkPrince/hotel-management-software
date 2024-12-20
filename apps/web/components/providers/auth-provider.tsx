"use client";

import { User } from '@prisma/client';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../config';

interface AuthContextType
{
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: async () => { },
    loading: true,
    register: async () => { },
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
            const response = await axios.get(`${BASE_URL}/auth/login`, {
                withCredentials: true, // Ensures cookies are sent with the request
            });
            if (response.data) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) =>
    {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/login`,
                { email, password },
                { withCredentials: true } // Ensures cookies are handled
            );
            if (!response.data) {
                throw new Error('Login failed');
            }
            setUser(response.data.user);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () =>
    {
        try {
            await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const register = async (email: string, password: string) =>
    {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/register`,
                { email, password },
                { withCredentials: true }
            );
            if (!response.data) {
                throw new Error('Registration failed');
            }
            setUser(response.data.user);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
