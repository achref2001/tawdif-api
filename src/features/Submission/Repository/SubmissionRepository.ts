// src/features/Submission/repositories/SubmissionRepository.ts

import { Submission, ISubmission } from "../Model/Submission";

export class SubmissionRepository {
  async create(submissionData: ISubmission) {
    return Submission.create(submissionData);
  }

  async getAll() {
    return Submission.find({ isDeleted: { $ne: true } });
  }

  async getById(id: string) {
    return Submission.findOne({ _id: id, isDeleted: { $ne: true } });
  }

  async updateStatus(id: string, status: "approved" | "refused") {
    return Submission.findByIdAndUpdate(id, { status }, { new: true });
  }

  async softDelete(id: string) {
    return Submission.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async getSubmissionsByCandidateId(candidateId: string) {
    return Submission.find({ candidateId, isDeleted: { $ne: true } })
      .populate('jobId', 'title company description requirements location salary')
      .exec();
  }
}
