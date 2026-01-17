import type { CreateTaskFormData } from '@/components/create-task-form.tsx';
import type { Task } from '@/types/task.ts';

export const fetchTask = async (id: string): Promise<Task> => {
  const response = await fetch(`http://localhost:8000/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
};

export const createTask = async (data: CreateTaskFormData): Promise<Task> => {
  const response = await fetch('http://localhost:8000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).getTime() : undefined,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: CreateTaskFormData;
}): Promise<Task> => {
  const response = await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).getTime() : undefined,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const fetchTasks = async (status: 'all' | 'pending' | 'completed'): Promise<Task[]> => {
  const url = new URL('http://localhost:8000/tasks');
  if (status !== 'all') {
    url.searchParams.append('status', status);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const updateTaskStatus = async ({
  id,
  status,
}: {
  id: string;
  status: 'pending' | 'completed';
}) => {
  const response = await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update task status');
  }
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:8000/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  if (response.status === 204) {
    return;
  }
  return response.json();
};
