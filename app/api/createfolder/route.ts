import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const projectId = process.env.PROJECTID!;
    const bucketName = process.env.BUCKETID!;

    const storage = new Storage({
        projectId: projectId,
    });

    try {
        const folderName = request.nextUrl.searchParams.get('foldername')!;
        const clientfolder = request.nextUrl.searchParams.get('clientfolder')!;
        const bucket = storage.bucket(bucketName);
        const finalFolder = clientfolder != 'mydrive' ? `${clientfolder}^/${folderName}` : folderName;
        const folder = await bucket.upload('public/localfile.png', {
            destination: `${finalFolder.concat('^')}/localfile.png`,
        })

        return NextResponse.json("created");
    } catch (error) {
        return NextResponse.json({ 'message': error });
    }
}