// src/features/submission/model/Submission.ts

import { Schema, model, Document, Types } from 'mongoose';

// src/features/Submission/Model/Submission.ts
export interface ISubmission {
    jobId: Types.ObjectId;
    candidateId: Types.ObjectId;
    resume: string; // URL for the CV file
    status: 'pending' | 'approved' | 'refused';
    // Add other fields as needed
}


const SubmissionSchema = new Schema<ISubmission>({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    resume: { type: String, required: true }, // URL of the CV
    status: { type: String, enum: ['pending', 'approved', 'refused'], default: 'pending' },
});

export const Submission = model<ISubmission>('Submission', SubmissionSchema);
