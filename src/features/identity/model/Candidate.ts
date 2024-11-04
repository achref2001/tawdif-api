import { Schema, model, Document } from 'mongoose';

export interface ICandidate extends Document {
    fullName: string;
    jobTitle: string;
    phoneNumber: string;
    email: string;
    age: number;
    picture?: string;
    linkedinProfile?: string;
    cv?: string; // URL or path to uploaded CV
    languages?: string[];
    skills?: string[];
    personalInfo: {
        fullName: string;
        jobTitle: string;
        phoneNumber: string;
        age: number;
    };
    experiences: {
        companyName: string;
        position: string;
        startDate: Date;
        endDate?: Date;
        description?: string;
    }[];
    education: {
        institutionName: string;
        degree: string;
        startDate: Date;
        endDate?: Date;
    }[];
    certifications: {
        name: string;
        issuedBy: string;
        dateIssued: Date;
    }[];
    password: string; // New password field
}

const CandidateSchema = new Schema<ICandidate>({
    fullName: { type: String, required: true },
    jobTitle: String,
    phoneNumber: String,
    email: { type: String, required: true, unique: true },
    age: Number,
    picture: String,
    linkedinProfile: String,
    cv: String,
    languages: [String],
    skills: [String],
    personalInfo: {
        fullName: String,
        jobTitle: String,
        phoneNumber: String,
        age: Number,
    },
    experiences: [
        {
            companyName: String,
            position: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            institutionName: String,
            degree: String,
            startDate: Date,
            endDate: Date,
        },
    ],
    certifications: [
        {
            name: String,
            issuedBy: String,
            dateIssued: Date,
        },
    ],
    password: { type: String, required: true }, 
});

export const Candidate = model<ICandidate>('Candidate', CandidateSchema);
