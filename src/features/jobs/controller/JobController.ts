// job.controller.ts
import { Request, Response } from 'express';
import { JobService } from '../service/JobService';

export class JobController {
    private jobService = new JobService();

    create = async (req: Request, res: Response) => {
        try {
            const jobData = { ...req.body, employerId: req.params.employerId };
            const job = await this.jobService.createJob(jobData);
            res.status(201).json(job);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };

    getAll = async (req: Request, res: Response) => {
        const jobs = await this.jobService.getAllJobs();
        res.status(200).json(jobs);
    };

    getById = async (req: Request, res: Response) => {
        const job = await this.jobService.getJobById(req.params.id);
        res.status(200).json(job);
    };

    update = async (req: Request, res: Response) => {
        const job = await this.jobService.updateJob(req.params.id, req.body);
        res.status(200).json(job);
    };

    delete = async (req: Request, res: Response) => {
        try {
            const job = await this.jobService.deleteJob(req.params.id);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    };
}
