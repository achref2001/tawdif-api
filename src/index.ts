// src/app.ts

import express from 'express';
import dotenv, { config } from 'dotenv';
import { connectDatabase } from './config/database';
import candidateRoutes from './features/identity/routes/CandidateRoutes';
import employerRoutes from './features/identity/routes/EmployerRoutes';
import jobRoutes from './features/jobs/routes/JobRoutes';
import submissionRoutes from './features/Submission/Routes/SubmissionRoutes'
import jwt from 'jsonwebtoken';

config({ path: '.env.production' });
const cors = require('cors');
// dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDatabase();
app.use(cors({
    origin: '*', // Allow your frontend domain
    methods: ['GET', 'POST'], // Allow methods (adjust if needed)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers (adjust as necessary)
}));
// Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/Job', jobRoutes);
app.use('/api/submissions', submissionRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
