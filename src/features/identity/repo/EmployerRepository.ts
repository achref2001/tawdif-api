import { IEmployer } from '../model/Employer';
import { Employer } from '../model/Employer';

export class EmployerRepository {
    async create(employer: IEmployer) {
        return await Employer.create(employer);
    }

    async findById(id: string) {
        return await Employer.findById(id);
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
}
