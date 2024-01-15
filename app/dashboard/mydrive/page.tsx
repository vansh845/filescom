import { resposnetype } from "@/app/api/getfiles/route"
import axios from "axios";
import UploadDialog from "@/components/filedialog"
import FileList from "@/components/filelist"
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
            <FileList files={files} />
        </div>
    )
}