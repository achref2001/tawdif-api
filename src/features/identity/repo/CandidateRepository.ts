import { Candidate, ICandidate } from '../model/Candidate';
import bcrypt from 'bcrypt';

export class CandidateRepository {
    async create(candidateData: ICandidate): Promise<ICandidate> {
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        candidateData.password = await bcrypt.hash(candidateData.password, salt);

        const candidate = new Candidate(candidateData);
        return candidate.save();
    }

    async findById(id: string): Promise<ICandidate | null> {
        return Candidate.findById(id);
    }

    async findAll(): Promise<ICandidate[]> {
        return Candidate.find();
    }

    async update(id: string, candidateData: Partial<ICandidate>): Promise<ICandidate | null> {
        if (candidateData.password) {
            const salt = await bcrypt.genSalt(10);
            candidateData.password = await bcrypt.hash(candidateData.password, salt);
        }
        return Candidate.findByIdAndUpdate(id, candidateData, { new: true });
    }

    async delete(id: string): Promise<ICandidate | null> {
        return Candidate.findByIdAndDelete(id);
    }

    async findByEmail(email: string): Promise<ICandidate | null> {
        return Candidate.findOne({ email });
    }
}
