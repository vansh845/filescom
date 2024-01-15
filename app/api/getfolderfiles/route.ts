import { Storage } from "@google-cloud/storage";
import { NextRequest } from "next/server";
import { resposnetype } from "../getfiles/route";

export async function GET(request: NextRequest) {

    const projectId = process.env.PROJECTID!;
    const bucketName = process.env.BUCKETID!;

    const storage = new Storage({
        projectId: projectId,
    });
    const foldername = request.nextUrl.searchParams.get('foldername')!;
    try {
        const [files] = await storage.bucket(bucketName).getFiles({
            prefix: foldername,
        });
        let res: resposnetype = [];
        const sm = files.map(async (file, i) => {
            const url = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });

            const data = await file.getMetadata();
            console.log(data[0].name + " " + data[0].size + " " + data[0].contentType);
            res.push({
                name: data[0].name!,
                size: data[0].size!.toString(),
                contentType: data[0].contentType!,
                url: url[0]
            });

        })
        const fin = await Promise.all(sm);
        return Response.json(res);
    } catch (err) {
        console.error('Error deleting file:', err);
        return Response.json({ 'message': 'error' })
    }


}