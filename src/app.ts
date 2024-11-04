// src/app.ts

import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import candidateRoutes from './features/identity/routes/CandidateRoutes';

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Routes
app.use('/api/candidates', candidateRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
