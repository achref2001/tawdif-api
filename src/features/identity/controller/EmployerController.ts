import { Request, Response } from 'express';
import { EmployerService } from '../service/EmployerService';
import { IEmployer } from '../model/Employer';

export class EmployerController {
    private employerService = new EmployerService();

    async register(req: Request, res: Response) {
        try {
            const employerData: IEmployer = req.body;
            const employer = await this.employerService.register(employerData);
            res.status(201).json(employer);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const employers = await this.employerService.getAllEmployers();
            res.status(200).json(employers);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const employer = await this.employerService.getEmployerById(req.params.id);
            res.status(200).json(employer);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const employer = await this.employerService.updateEmployer(req.params.id, req.body);
            res.status(200).json(employer);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.employerService.deleteEmployer(req.params.id);
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }
}
