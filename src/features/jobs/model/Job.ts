import { Schema, model, models } from 'mongoose';

// Add IJob interface
export interface IJob {
    title: string;
    description: string;
    location: string;
    requirements: string[];
    salary: number;
    employerId: Schema.Types.ObjectId;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const jobsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Check if the model already exists before defining it
const Job = models.Job || model('Job', jobsSchema);

export default Job;
