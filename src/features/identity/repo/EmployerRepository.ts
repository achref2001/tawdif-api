import { IEmployer } from '../model/Employer';
import { Employer } from '../model/Employer';
import * as bcrypt from 'bcrypt';
import Job, { IJob } from '../../jobs/model/Job';

export class EmployerRepository {
    async create(employer: IEmployer) {
        const hashedPassword = await bcrypt.hash(employer.password, 10);
        employer.password = hashedPassword;
        return await Employer.create(employer);
    }

    async findById(id: string) {
        const employer = await Employer.findById(id);
        if (!employer) return null;

        const jobs = await Job.find({ employerId: id, deleted: false }); // Fetch jobs associated with the employer
        return { ...employer.toObject(), jobs }; // Combine employer data with jobs
    }
    async getJobsWithEmployers() {
        return await Job.find({ deleted: false }).populate('employerId', '-password');
    }
    async findByEmail(email: string) {
        return Employer.findOne({ email });
    }

    async findAll() {
        return await Employer.find();
    }

    async update(id: string, employerData: Partial<IEmployer>) {
        return await Employer.findByIdAndUpdate(id, employerData, { new: true });
    }

    async delete(id: string) {
        return await Employer.findByIdAndDelete(id);
    }
    async checkJobs(id: string) {
        const jobResults = await Job.find({ employer: id });
        console.log('Direct job query:', jobResults);
    }
}
