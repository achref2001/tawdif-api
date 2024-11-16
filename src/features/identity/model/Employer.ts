import { Schema, model, Document, Types } from 'mongoose';

export interface IEmployer extends Document {
    username: string;
    email: string;
    password: string;
    companyName: string;
    companyDetails: string;
    Job: Types.ObjectId[];
}

const EmployerSchema = new Schema<IEmployer>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDetails: { type: String, required: true },
    Job: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }]
});

export const Employer = model<IEmployer>('Employer', EmployerSchema);
