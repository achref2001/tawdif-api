import { Router, Request, Response, NextFunction } from 'express';
import { SubmissionController } from '../Controller/SubmissionController';
import { asyncHandler } from '../../../utils/asyncHandler'; // Update this path accordingly

const router = Router();
const submissionController = new SubmissionController();

// Route to create a new submission
router.post('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return submissionController.createSubmission(req, res);
}));

// Route to get all submissions
router.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return submissionController.getAllSubmissions(req, res);
}));

// Route to get a specific submission by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return submissionController.getSubmissionById(req, res);
}));

// Route to update the status of a submission (approve/refuse)
router.patch('/:id/status', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return submissionController.updateStatus(req, res);
}));

// Route to soft-delete a submission
router.delete('/:id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return submissionController.deleteSubmission(req, res);
}));

export default router;