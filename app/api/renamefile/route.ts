import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const projectId = process.env.PROJECTID!;
    const bucketName = process.env.BUCKETID!;

    const storage = new Storage({
        projectId: projectId,
    });

    try {
        const filename = request.nextUrl.searchParams.get('filename')!;
        const destination = request.nextUrl.searchParams.get('destination')!;
        const folderName = request.nextUrl.searchParams.get('foldername')!;
        const finalSrc = folderName != 'mydrive' ? `${folderName}^/${filename}` : filename;
        const finalDestination = folderName != 'mydrive' ? `${folderName}^/${destination}` : destination;
        const bucket = storage.bucket(bucketName);
        const file = await bucket.file(finalSrc).rename(finalDestination);
        return NextResponse.json("deleted");
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }

}