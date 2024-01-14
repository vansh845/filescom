import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const projectId = process.env.PROJECTID!;
    const bucketName = process.env.BUCKETID!;

    const storage = new Storage({
        projectId: projectId,
    });

    try {

        const filename = request.nextUrl.searchParams.get('keyword')!;
        const file = await storage.bucket(bucketName).file(filename).delete();
        return NextResponse.json("deleted");
    } catch (err) {
        console.error('Error deleting file:', err);
        return NextResponse.json({ 'message': 'error' })
    }


}