import { IJob } from '../model/Job';
import Job from '../model/Job';

export class JobRepository {
    async create(job: IJob) {
        return await Job.create(job);
    }

    async findById(id: string) {
        return await Job.findOne({ _id: id, deleted: false }); // Filter out deleted job
    }

    async findAll() {
        return await Job.find({ deleted: false }); // Filter out deleted Job
    }

    async update(id: string, jobData: Partial<IJob>) {
        return await Job.findByIdAndUpdate(id, jobData, { new: true });
    }

    async softDelete(id: string) {
        return await Job.findByIdAndUpdate(id, { deleted: true }, { new: true });
    }
}
