import { Storage } from '@google-cloud/storage'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const projectId = process.env.PROJECTID!;
    const bucketName = process.env.BUCKETID!;

    const storage = new Storage({
        projectId: projectId,
    });

    const localFilePath = './public/localfile.png';
    const remoteFileName = 'remotefile.png';

    const bucket = storage.bucket(bucketName);

    try {
        // await bucket.upload(localFilePath, {
        //     destination: remoteFileName,
        // })
        const files = bucket.file(remoteFileName);
        const nm = await files.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'

        })
        console.log(nm);
        return NextResponse.json({ 'url': nm[0] })
    }
    catch (err) {
        console.error('Error uploading file:', err);
        return Response.json({ 'message': 'error' })
    }


}