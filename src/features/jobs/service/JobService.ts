import { IJob } from '../model/Job';
import { JobRepository } from '../repository/JobRepository';

export class JobService {
    private jobRepo = new JobRepository();

    async createJob(jobData: IJob) {
        return await this.jobRepo.create(jobData);
    }

    async getAllJobs() {
        return await this.jobRepo.findAll();
    }

    async getJobById(id: string) {
        return await this.jobRepo.findById(id);
    }

    async updateJob(id: string, jobData: Partial<IJob>) {
        return await this.jobRepo.update(id, jobData);
    }

    async deleteJob(id: string) {
        return await this.jobRepo.softDelete(id);
    }
}
