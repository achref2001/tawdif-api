import { Router, RequestHandler } from 'express';
import { JobController } from '../controller/JobController';
import { asyncHandler } from '../../../utils/asyncHandler';
const router = Router();
const jobController = new JobController();

// Define job routes with explicit typing as RequestHandler
router.post('/:employerId', asyncHandler(jobController.create));       
router.get('/', asyncHandler(jobController.getAll));                   
router.get('/:id', asyncHandler(jobController.getById));               
router.put('/:id', asyncHandler(jobController.update)); //? to fix               
router.delete('/:id', asyncHandler(jobController.delete));             

export default router;
