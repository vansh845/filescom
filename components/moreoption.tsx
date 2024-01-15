'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "./ui/button"
import { FolderOutputIcon, Loader2Icon, MoreVerticalIcon, PencilLine, Trash2Icon } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogClose } from "./ui/dialog"
import { Input } from "./ui/input"
import { resposnetype } from "@/app/api/getfiles/route"
export type proptype = {
    name: string,
    size: string,
    contentType: string,
    url: string
}

export default function MoreOption({ file, files }: { file: string, files: resposnetype }) {
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const [moveLoading, setMoveLoading] = useState(false);
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
    const [newName, setNewName] = useState(file);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    }
    const handleRename = async () => {
        setRenameLoading(true);
        try {
            await fetch(`/api/renamefile?filename=${file}&destination=${newName}`);
            toast.success('File renamed');
            router.refresh();
            document.getElementById("renameclose")?.click();
        } catch (error) {
            toast.error('Error renaming file', {
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            });
            console.log(error);

        }
        setRenameLoading(false);
    };
    const [dialogState, setDialogState] = useState('rename');

    const handleState = (e: React.MouseEvent<HTMLButtonElement>) => {
        setDialogState(e.currentTarget.name);
    }

    return (
        <Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    {loading ? <Loader2Icon className="animate-spin" /> : <div className={`${cn(buttonVariants({ variant: 'secondary' }))}`}><MoreVerticalIcon className="w-4" /></div>}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><Button className="w-full flex justify-between items-center" onClick={handleDelete} variant={'ghost'} size={'sm'}><p>Delete</p> <Trash2Icon className="w-4" /></Button></DropdownMenuItem>
                    <DropdownMenuItem>
                        <DialogTrigger asChild>
                            <Button onClick={handleState} name="rename" className="w-full flex justify-between items-center" variant={'ghost'} size={'sm'}><p>Rename</p><PencilLine className="w-4" /></Button>
                        </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <DialogTrigger asChild>
                            <Button onClick={handleState} name="move" className="w-full flex justify-between items-center" variant={'ghost'} size={'sm'}><p>Move</p><FolderOutputIcon className="w-4" /></Button>
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {dialogState === 'rename' ? (<DialogContent>
                <DialogHeader>Enter New Name</DialogHeader>
                <Input onChange={handleChange} value={newName} />
                <DialogFooter>
                    <Button onClick={handleRename}>{renameLoading ? <Loader2Icon className="animate-spin" /> : 'Rename'}</Button>
                    <DialogClose id="renameclose">Cancel</DialogClose>
                </DialogFooter>
            </DialogContent>) : <DialogContent>
                <DialogHeader>Select Destination Folder</DialogHeader>
                {files.map((file) => {
                    const foldername = file.name.split('/').at(-2)!;
                    if (file.name.includes('^')) {
                        return (<Button variant={'secondary'} className="text-left" key={file.name} value={file.name.split('/').at(-2)!}>{foldername.slice(0, -1)}</Button>)
                    }

                })}
                <DialogFooter>
                    <Button >{moveLoading ? <Loader2Icon className="animate-spin" /> : 'Move'}</Button>
                    <DialogClose id="renameclose">Cancel</DialogClose>
                </DialogFooter>
            </DialogContent>}
        </Dialog>
    )
}