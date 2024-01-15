import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { DeleteIcon, MoreVerticalIcon, PencilLine, PlusIcon, Trash2Icon } from "lucide-react"
import { FileIcon, ImageIcon, FolderIcon } from "lucide-react"
import { resposnetype } from "@/app/api/getfiles/route"
import Link from "next/link"
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import UploadDialog from "@/components/filedialog"
import MoreOption from "@/components/moreoption"
import { cn } from "@/lib/utils"
export default async function MyDrive() {

    const res = await axios.get("http://localhost:3000/api/getfiles");
    const files = await res.data as resposnetype;


    return (
        <div>

            <div className="flex flex-col my-3">
                <div>
                    <UploadDialog />

                </div>
            </div>
            <div className="space-y-2">
                {files.map((file) => {
                    if (file.name.split('/').at(-2)?.includes('^')) {
                        return (
                            <div>

                                <div className={`flex justify-between w-full ${cn(buttonVariants({ variant: 'secondary' }))}`}>
                                    <Link key={file.name} href={`/dashboard/mydrive/${file.name.split('/').at(-2)?.slice(0, -1)}`}>
                                        <div className="flex space-x-1 justify-center items-center">
                                            <FolderIcon />
                                            <p>{file.name.split('/').at(-2)?.slice(0, -1)}</p>
                                        </div>
                                    </Link>
                                    <MoreOption file={file.name.split('/').at(-2)!} />
                                </div>
                            </div>
                        )
                    }
                })}
                {files.map((file) => (
                    file.name.split('/').at(-1) === 'localfile.png' ? '' : (<div key={file.name}>
                        <div className={`flex justify-between w-full ${cn(buttonVariants({ variant: 'secondary' }))}`}>
                            <a target="blank" href={file.url} className="flex flex-col">
                                {/* <div className="bg-slate-100 hover:bg-slate-50 text-black justify-between"> */}
                                <div className="flex space-x-1 justify-center items-center">
                                    {file.contentType === 'image/png' || file.contentType === 'image/jpeg' ? <ImageIcon /> : (<FileIcon />)}
                                    <p>{file.name.split('/').at(-1)}</p>
                                </div>
                            </a>
                            <MoreOption file={file.name} />
                            {/* </div> */}
                        </div>

                    </div>)
                ))}
            </div>
        </div>
    )
}