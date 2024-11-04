// src/features/Submission/services/SubmissionService.ts

import { SubmissionRepository } from '../Repository/SubmissionRepository';
import { ISubmission } from '../Model/Submission';

export class SubmissionService {
    private submissionRepository = new SubmissionRepository();

    async createSubmission(submissionData: ISubmission) {
        return this.submissionRepository.create(submissionData);
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
}
