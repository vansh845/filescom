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
    const thirdLast = pathname.split("/").at(-3);
    const fourthLast = pathname.split("/").at(-4);
    console.log(pathname);

    return (

        <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 overflow-auto p-4">

                <div className="flex">
                    <p>{fourthLast ? `${fourthLast}>` : ''}</p>
                    <p>{thirdLast ? `${thirdLast}>` : ''}</p>
                    <p>{secondLast ? `${secondLast}>` : ''}</p>
                    <p>{last}</p>
                </div>
                {children}
            </div>
        </main>

    )
}