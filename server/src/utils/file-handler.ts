import fs from 'fs/promises';
import path from 'path';
import { Task } from '../types/task';

const filePath = path.join(__dirname, '../data/tasks.json');

export const readTasks = async (): Promise<Task[]> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeTasks = async (tasks: Task[]): Promise<void> => {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
};
