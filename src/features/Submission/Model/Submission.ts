// src/features/submissions/model/Submission.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface ISubmission extends Document {
    jobId: Types.ObjectId;
    candidateId: Types.ObjectId;
    resume: string;
    status: 'pending' | 'approved' | 'refused';
}

const SubmissionSchema = new Schema<ISubmission>({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    resume: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'refused'], default: 'pending' },
});

export const Submission = model<ISubmission>('Submission', SubmissionSchema);
