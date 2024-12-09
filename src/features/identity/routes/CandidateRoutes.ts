import { Router, Request, Response, NextFunction } from 'express';
import { createCandidate, loginCandidate, getAllCandidates, getCandidateById, updateCandidate, deleteCandidate, registerCandidate, deleteCandidateCV } from '../controller/CandidateController';
import { asyncHandler } from '../../../utils/asyncHandler';
import multer from 'multer';

const router = Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to filename
  },
});

const upload = multer({ storage });

// Define the routes with correct middleware types
router.post('/candidates', createCandidate); // Ensure createCandidate is correctly typed
router.post('/login', loginCandidate); // Ensure loginCandidate is correctly typed
router.get('/candidates', getAllCandidates); // Ensure getAllCandidates is correctly typed
router.get('/candidates/:id', getCandidateById); // Ensure getCandidateById is correctly typed
router.put('/candidates/:id', updateCandidate); // Ensure updateCandidate is correctly typed
router.delete('/candidates/:id', deleteCandidate); // Ensure deleteCandidate is correctly typed
router.post('/register', registerCandidate); // Ensure registerCandidate is correctly typed
router.delete('/candidates/:id/cv', deleteCandidateCV); // New route for deleting CV

export default router;