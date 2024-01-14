'use client'
import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const last = pathname.split("/").at(-1);
    const secondLast = pathname.split("/").at(-2);
    console.log(pathname);

    return (

        <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 overflow-auto p-4">

                <h2 className="font-medium text-md">{secondLast + ' > ' + last}</h2>
                {children}
            </div>
        </main>

    )
}