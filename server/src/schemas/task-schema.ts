import { z } from 'zod';

const priorities = ['low', 'medium', 'high'] as const;
const statuses = ['pending', 'completed'] as const;

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.string().refine((val) => (priorities as readonly string[]).includes(val), {
    message: "Priority must be 'low', 'medium', or 'high'",
  }),
  dueDate: z.number().optional(),
  status: z.string().refine((val) => (statuses as readonly string[]).includes(val), {
    message: "Status must be 'pending' or 'completed'",
  }),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').optional(),
  description: z.string().optional(),
  priority: z.string().refine((val) => (priorities as readonly string[]).includes(val), {
    message: "Priority must be 'low', 'medium', or 'high'",
  }).optional(),
  dueDate: z.number().optional(),
  status: z.string().refine((val) => (statuses as readonly string[]).includes(val), {
    message: "Status must be 'pending' or 'completed'",
  }).optional(),
});

export const getTasksQuerySchema = z.object({
  status: z.string().optional().refine((val) => {
    if (!val) return true;
    return ['all', 'pending', 'completed'].includes(val);
  }, {
    message: "Invalid status filter. Allowed values: all, pending, completed",
  }),
});
