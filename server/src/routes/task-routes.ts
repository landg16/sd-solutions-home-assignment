import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task-controller';
import { validateRequest } from '../middleware/validate-request';
import { createTaskSchema, updateTaskSchema, getTasksQuerySchema } from '../schemas/task-schema';

const router = Router();

router.get('/', validateRequest(getTasksQuerySchema, 'query'), getTasks);
router.get('/:id', getTaskById);
router.post('/', validateRequest(createTaskSchema), createTask);
router.put('/:id', validateRequest(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;
