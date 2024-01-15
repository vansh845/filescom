import { Storage } from '@google-cloud/storage'
import { File } from 'buffer';
import { unlink, writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { join } from 'path';

export async function POST(request: Request) {
    const projectId = process.env.PROJECTID!;
    const bucketName = process.env.BUCKETID!;

    const storage = new Storage({
        projectId: projectId,
    });

    const localFilePath = './public/localfile.png';
    const req = await request.formData();
    const name = req.get('name') as string;
    const file: File | null = req.get('file') as unknown as File;
    console.log(file);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join('./public', 'tmp', name);
    await writeFile(path, buffer);

    const bucket = storage.bucket(bucketName);

    try {
        await bucket.upload(`./public/tmp/${name}`, {
            destination: name
        })
        const files = bucket.file(name);
        const nm = await files.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'

        });
        await unlink(path);
        return NextResponse.json({ 'url': nm[0] })
    }
    catch (err) {
        console.error('Error uploading file:', err);
        return Response.json({ 'message': err })
    }


}