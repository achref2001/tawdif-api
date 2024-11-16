import { IEmployer } from '../model/Employer';
import { EmployerRepository } from '../repo/EmployerRepository';
import bcrypt from "bcrypt";

export class EmployerService {
    private employerRepo = new EmployerRepository();

    async register(employerData: IEmployer) {
        return await this.employerRepo.create(employerData);
    }

    async getAllEmployers() {
        return await this.employerRepo.findAll();
    }
    async getJobsWithEmployers() {
        return await this.employerRepo.getJobsWithEmployers();
    }
    async getEmployerById(id: string) {
        return await this.employerRepo.findById(id);
    }
    async findByEmail(email: string): Promise<IEmployer | null> {
        return this.employerRepo.findByEmail(email);
    }
    async login(email: string, password: string): Promise<IEmployer | null> {
        const employer = await this.employerRepo.findByEmail(email);
        if (employer && await bcrypt.compare(password, employer.password)) {
            return employer;
        }
        return null;
    }

    async updateEmployer(id: string, employerData: Partial<IEmployer>) {
        return await this.employerRepo.update(id, employerData);
    }

    async deleteEmployer(id: string) {
        return await this.employerRepo.delete(id);
    }
}
