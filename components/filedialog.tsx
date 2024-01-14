'use client'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRef } from "react"
export default function UploadDialog() {
    const fileInput = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (fileInput.current?.files && fileInput.current.files[0]) {
            const formData = new FormData();
            formData.append("name", fileInput.current.files[0].name);
            formData.append("file", fileInput.current.files[0]);
            await axios.post("http://localhost:3000/api/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
    }
    return (
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
                        <CardFooter>
                            <Button type="submit" variant="secondary">Upload</Button>
                        </CardFooter>
                    </form>
                </Card>
            </DialogContent>
        </Dialog>
    )
}