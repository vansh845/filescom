'use client'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Loader2Icon, PlusIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRef, useState } from "react"
import { toast } from 'sonner'
import { cn } from "@/lib/utils"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
// import { useMutation } from "@tanstack/react-query"

export default function UploadDialog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingFolder, setLoadingFolder] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        if (fileInput.current?.files && fileInput.current.files[0]) {
            try {
                const formData = new FormData();
                formData.append("name", fileInput.current.files[0].name);
                formData.append("file", fileInput.current.files[0]);
                await axios.post("/api/uploadfile", formData);
                setLoading(false);
                toast.success('File uploaded');
                document.getElementById("closer")?.click();
                router.refresh();
            }
            catch (error) {
                setLoading(false);
                toast.error('Error uploading file', {
                    style: {
                        backgroundColor: 'red',
                        color: 'white'
                    }
                });
            }
        }
    }
    const [folderName, setFolderName] = useState('');

    const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFolderName(e.target.value);
    }

    const handleFolderSubmit = async (e: React.MouseEvent) => {
        setLoadingFolder(true);
        e.preventDefault();
        try {
            await axios.get(`/api/createfolder?foldername=${folderName}`);
            setLoadingFolder(false);
            toast.success('Folder created');
            document.getElementById("closerFolder")?.click();
            router.refresh();
        }
        catch (error) {
            setLoadingFolder(false);
            toast.error('Error creating folder', {
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            });
        }
    }

    return (<>
        <Dialog>
            <DialogTrigger>

                <Button className="space-x-1" variant="outline">
                    <PlusIcon className="w-4 h-4" />
                    <p>File</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Card>
                    <CardHeader>
                        Upload file
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <Input type='file' ref={fileInput} />
                        </CardContent>
                        <CardFooter className="space-x-1">
                            <Button className={loading ? `hover:cursor-not-allowed` : ''} type="submit" variant="default">{loading ? <Loader2Icon className="animate-spin" /> : 'Upload'}</Button>
                            <DialogClose id="closer" className={cn(buttonVariants({ variant: 'outline' }))}>Cancel</DialogClose>
                        </CardFooter>
                    </form>
                </Card>
            </DialogContent>
        </Dialog>
        <Dialog>
            <DialogTrigger>

                <Button className="space-x-1" variant="outline">
                    <PlusIcon className="w-4 h-4" />
                    <p>Folder</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Card>
                    <CardHeader>
                        Create folder
                    </CardHeader>
                    <CardContent>
                        <Input type='text' value={folderName} onChange={handleFolderChange} />
                    </CardContent>
                    <CardFooter className="space-x-1">
                        <Button onClick={handleFolderSubmit} className={loadingFolder ? `hover:cursor-not-allowed` : ''} variant="default">{loadingFolder ? <Loader2Icon className="animate-spin" /> : 'Create'}</Button>
                        <DialogClose id="closerFolder" className={cn(buttonVariants({ variant: 'outline' }))}>Cancel</DialogClose>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    </>
    )
}