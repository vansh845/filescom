import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Folder, FolderIcon } from 'lucide-react'
import { PersonIcon } from "@radix-ui/react-icons";

function Sidebar() {
    return (
        <nav className="w-64 bg-white text-black p-4">
            <div className="mx-3 my-3">
                <h2 className="font-bold text-lg">Files.com</h2>
            </div>
            <div className="space-y-2">
                <Link
                    className="flex items-center space-x-2 text-gray-600 dark:text-black p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="/dashboard/mydrive"
                >
                    <FolderIcon className="w-5 h-5" />
                    <span>My Drive</span>
                </Link>
                <Link
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="/dashboard/account"
                >
                    <PersonIcon className="w-5 h-5" />
                    <span>Account</span>
                </Link>

            </div>
        </nav>
    )
}



export { Sidebar };