
import { Router } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import {
    createCandidate,
    getAllCandidates,
    getCandidateById,
    updateCandidate,
    deleteCandidate,
} from '../controller/CandidateController';

const router = Router();

router.post('/', asyncHandler(createCandidate));
router.get('/', getAllCandidates);
router.get('candidates/:id', asyncHandler(getCandidateById));
router.put('candidates/:id', asyncHandler(updateCandidate));
router.delete('candidates/:id', asyncHandler(deleteCandidate));

export default router;
