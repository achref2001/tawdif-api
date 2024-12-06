import { Request, Response } from 'express';
import { SubmissionService } from '../Service/SubmissionService';
import { ISubmission } from '../Model/Submission';
import { minioClient, bucketName } from '../../../config/minioClient';
import multer from 'multer';
import { Readable } from 'stream';

// Configure multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export class SubmissionController {
    private submissionService = new SubmissionService();

    
        async createSubmission(req: Request, res: Response) {
            const { jobId, candidateId } = req.body;
            const file = req.file;
    
            if (!file) {
                return res.status(400).json({ message: 'CV file is required' });
            }
    
            try {
                const submission = await this.submissionService.createSubmission({
                    jobId,
                    candidateId,
                    cvFile: file,
                });
                res.status(201).json(submission);
            } catch (error) {
                res.status(500).json({ error: 'Error saving submission' });
            }
        }
    
    // Other methods remain unchanged



    async getAllSubmissions(req: Request, res: Response) {
        const submissions = await this.submissionService.getAllSubmissions();
        res.status(200).json(submissions);
    }

    async getSubmissionById(req: Request, res: Response) {
        const submission = await this.submissionService.getSubmissionById(req.params.id);
        if (!submission) {
            throw new Error('Submission not found');
        }
        res.status(200).json(submission);
    }

    async updateStatus(req: Request, res: Response) {
        const { status } = req.body;
        if (!['approved', 'refused'].includes(status)) {
            throw new Error('Invalid status');
        }
        const updatedSubmission = await this.submissionService.updateSubmissionStatus(req.params.id, status as 'approved' | 'refused');
        if (!updatedSubmission) {
            throw new Error('Submission not found');
        }
        res.status(200).json(updatedSubmission);
    }

    async deleteSubmission(req: Request, res: Response) {
        const deletedSubmission = await this.submissionService.deleteSubmission(req.params.id);
        if (!deletedSubmission) {
            throw new Error('Submission not found');
        }
        res.status(204).send();
    }
    uploadCv = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No CV file uploaded' });
            }

            // Assuming you have logic for uploading the file (e.g., saving to a server or cloud storage)
            const fileUrl = await this.submissionService.uploadCv(req.file);

            res.status(200).json({
                message: 'CV uploaded successfully',
                fileUrl,
            });
        } catch (error) {
            console.error('Error uploading CV:', error);
            res.status(500).json({ message: 'Error uploading CV' });
        }
    };

    async getSubmissionsByCandidateId(req: Request, res: Response) {
        const { candidateId } = req.params;
    
        try {
            const submissions = await this.submissionService.getSubmissionsByCandidateId(candidateId);
            if (!submissions || submissions.length === 0) {
                return res.status(404).json({ message: 'No submissions found for the given candidate ID' });
            }
            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching submissions by candidate ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
