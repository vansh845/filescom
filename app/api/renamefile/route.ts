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
        const bucket = storage.bucket(bucketName);
        const file = await bucket.file(filename).rename(destination);
        return NextResponse.json("deleted");
    } catch (error) {
        return new Response('error', { status: 500 })
    }

}