import { Schema, model, Document, Types } from 'mongoose';

export interface IJob extends Document {
    title: string;
    description: string;
    location: string;
    requirements: string[];
    salary: number;
    employerId: Types.ObjectId; // Reference to the employer
    deleted?: boolean; // New field for soft delete
}

const JobSchema = new Schema<IJob>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    requirements: { type: [String], required: true },
    salary: { type: Number, required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'Employer', required: true },
    deleted: { type: Boolean, default: false } // Set default to false
});

export const Job = model<IJob>('Job', JobSchema);
