// src/features/Submission/services/SubmissionService.ts

import { SubmissionRepository } from '../Repository/SubmissionRepository';
import { minioClient, bucketName } from '../../../config/minioClient';
import { Types } from 'mongoose'; // Import Types from mongoose

export class SubmissionService {
    private submissionRepository = new SubmissionRepository();

    async createSubmission(submissionData: { jobId: string; candidateId: string; cvFile: Express.Multer.File }) {
        const { jobId, candidateId, cvFile } = submissionData;

        // Convert jobId and candidateId to ObjectId using 'new'
        const jobObjectId = new Types.ObjectId(jobId);
        const candidateObjectId = new Types.ObjectId(candidateId);

        // Define the file name for MinIO
        const fileName = `cv-${Date.now()}-${cvFile.originalname}`;

        // Upload file to MinIO
        await minioClient.putObject(bucketName, fileName, cvFile.buffer);

        // Construct the MinIO file URL
        const fileUrl = `-------------/${bucketName}/${fileName}`;

        // Save submission details in the database
        return this.submissionRepository.create({
            jobId: jobObjectId, // Ensure this is an ObjectId
            candidateId: candidateObjectId, // Ensure this is an ObjectId
            resume: fileUrl, // Save the URL in the resume field
            status: 'pending', // Default status
        });
    }

    async getAllSubmissions() {
        return this.submissionRepository.getAll();
    }

    async getSubmissionById(id: string) {
        return this.submissionRepository.getById(id);
    }

    async updateSubmissionStatus(id: string, status: 'approved' | 'refused') {
        return this.submissionRepository.updateStatus(id, status);
    }

    async deleteSubmission(id: string) {
        return this.submissionRepository.softDelete(id);
    }
    async uploadCv(cvFile: Express.Multer.File): Promise<string> {
        if (!cvFile) {
            throw new Error('No CV file provided');
        }

        // Define the file name for MinIO
        const fileName = `cv-${Date.now()}-${cvFile.originalname}`;

        // Upload file to MinIO
        await minioClient.putObject(bucketName, fileName, cvFile.buffer);

        // Construct the MinIO file URL
        const fileUrl = `const fileUrl = -------------/${bucketName}/${fileName}`;

        return fileUrl;
    }
}
