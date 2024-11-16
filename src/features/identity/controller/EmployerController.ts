import { Request, Response } from 'express';
import { EmployerService } from '../service/EmployerService';
import { asyncHandler } from '../../../utils/asyncHandler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const employerService = new EmployerService();
const JWT_SECRET = process.env.JWT_SECRET as string || 'default_jwt_secret';

// Create Employer
export const createEmployer = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password, companyName, companyDetails, ...otherData } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const newEmployer = await employerService.register({
        username,
        email,
        password,
        companyName,
        companyDetails,
        ...otherData,
    });

    res.status(201).json(newEmployer);
});

// Employer Login
export const loginEmployer = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    const employer = await employerService.findByEmail(email);
    console.log('Employer found:', employer ? 'Yes' : 'No');
    
    if (!employer) {
        console.log('No employer found with this email');
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Temporary debugging - DO NOT USE IN PRODUCTION
    console.log('Stored hashed password:', employer.password);
    console.log('Provided password:', password);
    
    const isPasswordValid = await bcrypt.compare(password, employer.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
        console.log('Password comparison failed');
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: employer._id, role: 'employer' }, JWT_SECRET, {
        expiresIn: '10h',
    });

    console.log('Login successful, token generated');
    res.json({ token });
});
export const getJobsWithEmployers = asyncHandler(async (req: Request, res: Response) => {
    const jobsWithEmployers = await employerService.getJobsWithEmployers();
    res.json(jobsWithEmployers);
});

// Get all Employers
export const getAllEmployers = asyncHandler(async (req: Request, res: Response) => {
    const employers = await employerService.getAllEmployers();
    res.json(employers);
});

// Get Employer by ID
export const getEmployerById = asyncHandler(async (req: Request, res: Response) => {
    const employer = await employerService.getEmployerById(req.params.id);

    if (!employer) {
        return res.status(404).json({ message: 'Employer not found' });
    }

    res.json(employer);
});


// Update Employer
export const updateEmployer = asyncHandler(async (req: Request, res: Response) => {
    const updatedEmployer = await employerService.updateEmployer(req.params.id, req.body);
    if (!updatedEmployer) {
        return res.status(404).json({ message: 'Employer not found' });
    }
    res.json(updatedEmployer);
});

// Delete Employer
export const deleteEmployer = asyncHandler(async (req: Request, res: Response) => {
    const deletedEmployer = await employerService.deleteEmployer(req.params.id);
    if (!deletedEmployer) {
        return res.status(404).json({ message: 'Employer not found' });
    }
    res.json({ message: 'Employer deleted successfully' });
});
