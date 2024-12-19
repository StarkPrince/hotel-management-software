import { ThemeProvider } from "@/apps/web/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { RecoilRoot } from "recoil"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Welcome to Hotel Management System",
    description: "Modern booking management software",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
})
{
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <RecoilRoot>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </RecoilRoot>
            </body>
        </html>
    )
}

