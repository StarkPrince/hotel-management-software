import Sidebar from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hotel Management System",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background p-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
