import { Router } from 'express';
// import { EmployerController } from '../controller/EmployerController';
import { UserRole } from '../../../types/UserRole';
import { authorize } from '../../../middleware/authorize';

import { asyncHandler } from '../../../utils/asyncHandler';

import {
    createEmployer,
    deleteEmployer, getAllEmployers,getEmployerById,loginEmployer,updateEmployer,getJobsWithEmployers

  } from '../controller/EmployerController';
  
const router = Router();
// const employerController = new EmployerController();
router.post('/', asyncHandler(createEmployer));
router.post('/login', asyncHandler(loginEmployer));
router.get('/', asyncHandler(getAllEmployers));
router.get('/jobs-with-employers', asyncHandler(getJobsWithEmployers));
router.get('/:id', asyncHandler(getEmployerById));
router.put('/:id', asyncHandler(updateEmployer));
router.delete('/:id', asyncHandler(deleteEmployer));
export default router;
