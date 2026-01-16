export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string; // ISO date string
  status: TaskStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
