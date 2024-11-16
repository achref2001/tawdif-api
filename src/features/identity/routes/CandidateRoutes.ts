import { Router } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { authorize } from '../../../middleware/authorize';
import { UserRole } from '../../../types/UserRole';
import jwt from 'jsonwebtoken';

import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  loginCandidate,
} from '../controller/CandidateController';

const router = Router();

// Define routes with authorize middleware for role-based access
router.post('/', asyncHandler(createCandidate));
router.post('/login', asyncHandler(loginCandidate));
router.get('/', authorize([UserRole.EMPLOYER, UserRole.ADMIN]), asyncHandler(getAllCandidates));
router.get('/candidates/:id', asyncHandler(getCandidateById));
router.put('/candidates/:id', asyncHandler(updateCandidate));
router.delete('/candidates/:id', asyncHandler(deleteCandidate));

export default router;
