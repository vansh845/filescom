'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "./ui/button"
import { Loader2Icon, MoreVerticalIcon, PencilLine, Trash2Icon } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
export type proptype = {
    name: string,
    size: string,
    contentType: string,
    url: string
}

export default function MoreOption({ file }: { file: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.get(`/api/${file.includes('^') ? 'deletefolder?foldername' : 'deletefile?filename'}=${file}`)
            setLoading(false);
            toast.success('File deleted');
            router.refresh();
        }
        catch (error) {
            setLoading(false);
            toast.error('Error deleting file', {
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {loading ? <Loader2Icon className="animate-spin" /> : <div className={`${cn(buttonVariants({ variant: 'secondary' }))}`}><MoreVerticalIcon className="w-4" /></div>}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem><Button onClick={handleDelete} variant={'ghost'} size={'sm'}><p>Delete</p> <Trash2Icon className="w-4" /></Button></DropdownMenuItem>
                <DropdownMenuItem><Button variant={'ghost'} size={'sm'}><p>Rename</p><PencilLine className="w-4" /></Button></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}