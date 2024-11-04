// src/app.ts

import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import candidateRoutes from './features/identity/routes/CandidateRoutes';
import employerRoutes from './features/identity/routes/EmployerRoutes';
import jobRoutes from './features/jobs/routes/JobRoutes';
import submissionRoutes from './features/Submission/Routes/SubmissionRoutes'
dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/submissions', submissionRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
