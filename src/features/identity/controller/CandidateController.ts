import { Request, Response } from 'express';
import { CandidateService } from '../service/CandidateService';
import { asyncHandler } from '../../../utils/asyncHandler';

const candidateService = new CandidateService();

export const createCandidate = asyncHandler(async (req: Request, res: Response) => {
    const { fullName, jobTitle, phoneNumber, age, password, ...otherData } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const newCandidate = await candidateService.createCandidate({
        fullName,
        jobTitle,
        phoneNumber,
        age,
        password,
        ...otherData,
    });

    res.status(201).json(newCandidate);
});

export const getAllCandidates = asyncHandler(async (req: Request, res: Response) => {
    const candidates = await candidateService.getAllCandidates();
    res.json(candidates);
});

export const getCandidateById = asyncHandler(async (req: Request, res: Response) => {
    const candidate = await candidateService.getCandidateById(req.params.id);
    if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
});

export const updateCandidate = asyncHandler(async (req: Request, res: Response) => {
    const updatedCandidate = await candidateService.updateCandidate(req.params.id, req.body);
    if (!updatedCandidate) {
        return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(updatedCandidate);
});

export const deleteCandidate = asyncHandler(async (req: Request, res: Response) => {
    const deletedCandidate = await candidateService.deleteCandidate(req.params.id);
    if (!deletedCandidate) {
        return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully' });
});
