import { resposnetype } from "@/app/api/getfiles/route";
import UploadDialog from "@/components/filedialog";
import FileList from "@/components/filelist";
import axios from "axios"
import { headers } from 'next/headers'
export default async function FolderPage() {

    // const res = await axios.get(`/api/getfolderfiles?folderanme=${params.foldername}`)
    const headerList = headers();
    const pathname = headerList.get('x-pathname');
    const foldernm = pathname?.split('/').at(-1);
    const res = await axios.get('http://localhost:3000/api/getfolderfiles?foldername=' + foldernm + '^');
    const files = await res.data as resposnetype;
    return (
        <div>

            <div className="flex flex-col my-3">
                <div>
                    <UploadDialog />

                </div>
            </div>
            <FileList files={files} />
        </div>
    )
}