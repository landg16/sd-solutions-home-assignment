import type { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft the initial proposal for the new client project.',
    priority: 'high',
    dueDate: '2023-12-15T00:00:00.000Z',
    status: 'pending',
    createdAt: '2023-12-01T10:00:00.000Z',
    updatedAt: '2023-12-01T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Review Code PRs',
    priority: 'medium',
    status: 'completed',
    createdAt: '2023-12-02T09:30:00.000Z',
    updatedAt: '2023-12-03T14:20:00.000Z',
  },
  {
    id: '3',
    title: 'Update Documentation',
    description: 'Update the API documentation with the latest changes.',
    priority: 'low',
    status: 'pending',
    createdAt: '2023-12-05T11:15:00.000Z',
    updatedAt: '2023-12-05T11:15:00.000Z',
  },
];
