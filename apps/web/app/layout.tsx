"use client"; // Keep the RootLayout a client component

import { AuthProvider } from '@/apps/web/components/providers/auth-provider';
import { ThemeProvider } from "@/apps/web/components/theme-provider";
import { Toaster } from '@/apps/web/components/ui/sonner';
import { Inter } from "next/font/google";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
                <title>LuxStay - Luxury Hotel Management</title>
                <meta
                    name="description"
                    content="Experience luxury at its finest"
                />
            </Head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <RecoilRoot>
                        <AuthProvider>
                            {children}
                            <Toaster />
                        </AuthProvider>
                    </RecoilRoot>
                </ThemeProvider>
            </body>
        </html>
    );
}
