'use client'
import { resposnetype } from "@/app/api/getfiles/route";
import { cn } from "@/lib/utils";
import { FileIcon, FolderIcon, ImageIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MoreOption from "./moreoption";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FileList({ files }: { files: resposnetype }) {
    const path = usePathname();
    const foldername = path?.split('/').at(-1);
    if (files.length === 1) {
        return (
            <div className="flex flex-col justify-center items-center">
                <p>No files found</p>
            </div>
        )
    }
    useEffect(() => {
        if (foldername === 'mydrive') {

            localStorage.setItem('files', JSON.stringify(files));
        }
    })
    return (

        <div className="space-y-2">
            {files.map((file) => {
                if (file.name.split('/').at(-2) === foldername + '^') {
                    return
                }
                if (file.name.split('/').at(-2)?.includes('^') && !file.name.split('/').at(-3)?.includes('^') && file.name.split('/').at(-1) === 'localfile.png') {
                    return (
                        <div key={file.name}>
                            <div className={`flex justify-between w-full ${cn(buttonVariants({ variant: 'secondary' }))}`}>
                                <Link key={file.name} href={`/dashboard/mydrive/folder/${file.name.split('/').at(-2)?.slice(0, -1)}`}>
                                    <div className="flex space-x-1 justify-center items-center">
                                        <FolderIcon />
                                        <p>{file.name.split('/').at(-2)?.slice(0, -1)}</p>
                                    </div>
                                </Link>
                                <MoreOption files={files} file={file.name.split('/').at(-2)!} />
                            </div>
                        </div>
                    )
                }
            })}
            {files.map((file) => (
                foldername === 'mydrive' && !file.name.includes('^') && file.name.split('/').at(-1) !== 'localfile.png' ? (<div key={file.name}>
                    <div className={`flex justify-between w-full ${cn(buttonVariants({ variant: 'secondary' }))}`}>
                        <a target="blank" href={file.url} className="flex flex-col">
                            {/* <div className="bg-slate-100 hover:bg-slate-50 text-black justify-between"> */}
                            <div className="flex space-x-1 justify-center items-center">
                                {file.contentType === 'image/png' || file.contentType === 'image/jpeg' ? <ImageIcon /> : (<FileIcon />)}
                                <p>{file.name.split('/').at(-1)}</p>
                            </div>
                        </a>
                        <MoreOption files={files} file={file.name.split('/').at(-1)!} />
                        {/* </div> */}
                    </div>

                </div>) : ''
            ))}
            {files.map((file) => (
                foldername !== 'mydrive' && file.name.includes('^') && file.name.split('/').at(-1) !== 'localfile.png' ? (<div key={file.name}>
                    <div className={`flex justify-between w-full ${cn(buttonVariants({ variant: 'secondary' }))}`}>
                        <a target="blank" href={file.url} className="flex flex-col">
                            {/* <div className="bg-slate-100 hover:bg-slate-50 text-black justify-between"> */}
                            <div className="flex space-x-1 justify-center items-center">
                                {file.contentType === 'image/png' || file.contentType === 'image/jpeg' ? <ImageIcon /> : (<FileIcon />)}
                                <p>{file.name.split('/').at(-1)}</p>
                            </div>
                        </a>
                        <MoreOption files={files} file={file.name.split('/').at(-1)!} />
                        {/* </div> */}
                    </div>

                </div>) : ''
            ))}
        </div>
    )
}