import { Client } from 'minio';

export const minioClient = new Client({
    endPoint: 'localhost',        // Replace with your MinIO server address
    port: 9000,                   // Replace with your MinIO server port
    useSSL: false,                // Set to true if your MinIO server uses SSL
    accessKey: '4AByYwQdLhdQyjaTyLvc',    // Replace with your MinIO Access Key
    secretKey: 'apfxS7Mqopd8IKhsHY48PFJ2piIAqV2QyPhEyglj',  // Replace with your MinIO Secret Key
});

export const bucketName = 'tawdif';

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
