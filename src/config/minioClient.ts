import { Client } from 'minio';
import * as dotenv from 'dotenv';

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.local' });
} else {
    dotenv.config({ path: '.env.test' });
}

export const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || '',
    secretKey: process.env.MINIO_SECRET_KEY || '',
});

export const bucketName = process.env.MINIO_BUCKET_NAME || 'tawdif';

async function ensureBucketExists(bucketName: string) {
    try {
        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
            await minioClient.makeBucket(bucketName, 'us-east-1'); // Specify the region if required
            console.log(`Bucket "${bucketName}" created successfully.`);
        } else {
            console.log(`Bucket "${bucketName}" already exists.`);
        }
    } catch (error) {
        console.error('Error with bucket existence check or creation:', error);
    }
}

// Call this function to ensure the bucket is created
ensureBucketExists(bucketName);
