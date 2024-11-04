import { Router } from 'express';
import { EmployerController } from '../controller/EmployerController';

const router = Router();
const employerController = new EmployerController();

router.post('/', employerController.register.bind(employerController));
router.get('/', employerController.getAll.bind(employerController));
router.get('/:id', employerController.getById.bind(employerController));
router.put('/:id', employerController.update.bind(employerController));
router.delete('/:id',  employerController.delete.bind(employerController));
export default router;