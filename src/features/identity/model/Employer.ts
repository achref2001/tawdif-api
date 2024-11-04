import { Schema, model, Document } from 'mongoose';

export interface IEmployer extends Document {
    username: string;
    email: string;
    password: string;
    companyName: string;
    companyDetails: string;
}

const EmployerSchema = new Schema<IEmployer>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDetails: { type: String, required: true },
});

export const Employer = model<IEmployer>('Employer', EmployerSchema);
