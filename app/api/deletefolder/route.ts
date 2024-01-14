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
        const [files] = await storage.bucket(bucketName).getFiles({
            prefix: folderName
        });
        files.map((file) => {
            file.delete();
        });
        return NextResponse.json("deleted");
    } catch (error) {
        return NextResponse.json({ 'message': error });
    }

}