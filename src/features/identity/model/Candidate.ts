import { Schema, model, Document } from 'mongoose';

export interface ICandidate extends Document {
    fullName?: string;
    jobTitle?: string;
    phoneNumber?: string;
    email: string;
    age?: number;
    picture?: string;
    linkedinProfile?: string;
    cv?: string; // URL or path to uploaded CV
    languages?: string[];
    skills?: string[];
    experiences?: {
        companyName: string;
        position: string;
        startDate: Date;
        endDate?: Date;
        description?: string;
    }[];
    education?: {
        institutionName: string;
        degree: string;
        startDate: Date;
        endDate?: Date;
    }[];
    certifications?: {
        name: string;
        issuedBy: string;
        dateIssued: Date;
    }[];
    password: string;
    role?: string;
}

const CandidateSchema = new Schema<ICandidate>({
    fullName: { type: String, default: null },
    jobTitle: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: null },
    picture: { type: String, default: null },
    linkedinProfile: { type: String, default: null },
    cv: { type: String, default: null },
    languages: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    experiences: [
        {
            companyName: { type: String, default: null },
            position: { type: String, default: null },
            startDate: { type: Date, default: null },
            endDate: { type: Date, default: null },
            description: { type: String, default: null },
        },
    ],
    education: [
        {
            institutionName: { type: String, default: null },
            degree: { type: String, default: null },
            startDate: { type: Date, default: null },
            endDate: { type: Date, default: null },
        },
    ],
    certifications: [
        {
            name: { type: String, default: null },
            issuedBy: { type: String, default: null },
            dateIssued: { type: Date, default: null },
        },
    ],
    password: { type: String, required: true },
    role: { type: String, default: 'candidate' }, // Default role set to 'candidate'
});

export const Candidate = model<ICandidate>('Candidate', CandidateSchema);
