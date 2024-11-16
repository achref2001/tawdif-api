import { Request, Response } from 'express';
import { CandidateService } from '../service/CandidateService';
import { asyncHandler } from '../../../utils/asyncHandler';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
const candidateService = new CandidateService();
const JWT_SECRET = process.env.JWT_SECRET as string || 'default_jwt_secret';
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
export const loginCandidate = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const candidate = await candidateService.findByEmail(email);
    if (!candidate) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, candidate.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: candidate._id, role: 'candidate' }, JWT_SECRET, {
        expiresIn: '1h', // Token validity
    });

    res.json({ token });
    
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
