export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: number;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
};
