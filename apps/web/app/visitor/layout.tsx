import Sidebar from "@/apps/web/components/sidebar"
import type { Metadata } from "next"


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
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background p-8">
                {children}
            </main>
        </div>
    )
}
