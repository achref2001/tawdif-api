import { IEmployer } from '../model/Employer';
import { EmployerRepository } from '../repo/EmployerRepository';

export class EmployerService {
    private employerRepo = new EmployerRepository();

    async register(employerData: IEmployer) {
        return await this.employerRepo.create(employerData);
    }

    async getAllEmployers() {
        return await this.employerRepo.findAll();
    }

    async getEmployerById(id: string) {
        return await this.employerRepo.findById(id);
    }

    async updateEmployer(id: string, employerData: Partial<IEmployer>) {
        return await this.employerRepo.update(id, employerData);
    }

    async deleteEmployer(id: string) {
        return await this.employerRepo.delete(id);
    }
}
