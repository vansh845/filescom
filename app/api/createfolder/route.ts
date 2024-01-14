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
        const bucket = storage.bucket(bucketName);
        const folder = await bucket.upload('public/localfile.png', {
            destination: 'folder/remote.png'
        })
        return NextResponse.json("created");
    } catch (error) {
        return NextResponse.json({ 'message': error });
    }
}