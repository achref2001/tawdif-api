import { Request, Response } from 'express';
import { SubmissionService } from '../Service/SubmissionService';
import { ISubmission } from '../Model/Submission';

export class SubmissionController {
    private submissionService = new SubmissionService();

    async createSubmission(req: Request, res: Response) {
        const submissionData: ISubmission = req.body;
        const submission = await this.submissionService.createSubmission(submissionData);
        res.status(201).json(submission);
    }

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
}
