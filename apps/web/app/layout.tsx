import Header from '@/apps/web/components/layout/header';
import { AuthProvider } from '@/apps/web/components/providers/auth-provider';
import { ThemeProvider } from '@/apps/web/components/theme-provider';
import { Toaster } from '@/apps/web/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LuxStay - Hotel Management System',
  description: 'Modern hotel management system for guests and staff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Header />
              <main>{children}</main>
              <Toaster />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}