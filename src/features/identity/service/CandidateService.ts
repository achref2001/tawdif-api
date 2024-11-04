import { CandidateRepository } from '../repo/CandidateRepository';
import { ICandidate } from '../model/Candidate';

export class CandidateService {
    private candidateRepo: CandidateRepository;

    constructor() {
        this.candidateRepo = new CandidateRepository();
    }

    async createCandidate(candidateData: ICandidate): Promise<ICandidate> {
        return this.candidateRepo.create(candidateData);
    }

    async getCandidateById(id: string): Promise<ICandidate | null> {
        return this.candidateRepo.findById(id);
    }

    async getAllCandidates(): Promise<ICandidate[]> {
        return this.candidateRepo.findAll();
    }

    async updateCandidate(id: string, candidateData: Partial<ICandidate>): Promise<ICandidate | null> {
        return this.candidateRepo.update(id, candidateData);
    }

    async deleteCandidate(id: string): Promise<ICandidate | null> {
        return this.candidateRepo.delete(id);
    }

    async findByEmail(email: string): Promise<ICandidate | null> {
        return this.candidateRepo.findByEmail(email);
    }
}
