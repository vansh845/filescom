import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { FileIcon, ImageIcon, FolderIcon } from "lucide-react"
import { resposnetype } from "@/app/api/getfiles/route"
import Link from "next/link"
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import UploadDialog from "@/components/filedialog"
export default async function MyDrive() {

    const res = await axios.get("http://localhost:3000/api/getfiles");
    const files = await res.data as resposnetype;


    return (
        <div >

            <div className="flex flex-col my-3">
                <div>
                    <UploadDialog />
                    <Button className="space-x-1" variant="outline">
                        <PlusIcon className="w-4 h-4" />
                        <p>Folder</p>
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                {files.map((file) => (
                    <div key={file.name}>
                        <a target="blank" href={file.url} className="flex flex-col">
                            <Button variant={"secondary"} className="flex justify-between w-full ">
                                {/* <div className="bg-slate-100 hover:bg-slate-50 text-black justify-between"> */}
                                <p>{file.name.split('/').at(-1)}</p>
                                <div>
                                    <p>{parseInt(file.size) / 1000000}</p>
                                    <p>{file.contentType}</p>
                                </div>
                                {/* </div> */}
                            </Button>
                        </a>

                    </div>
                ))}
            </div>
        </div>
    )
}