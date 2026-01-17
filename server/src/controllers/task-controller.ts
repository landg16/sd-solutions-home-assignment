import { Request, Response } from 'express';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { randomUUID } from 'crypto';
import { readTasks, writeTasks } from '../utils/file-handler';

export const getTasks = async (req: Request, res: Response) => {
  const status = req.query.status as string | undefined;
  let tasks = await readTasks();

  if (status && status !== 'all') {
    tasks = tasks.filter((task) => task.status === status);
  }

  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, priority, dueDate, status } = req.body;

  const newTask: Task = {
    id: randomUUID(),
    title,
    description,
    priority: priority as TaskPriority,
    dueDate: dueDate ? Number(dueDate) : undefined,
    status: status as TaskStatus,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const tasks = await readTasks();
  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, status } = req.body;

  const tasks = await readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    priority: (priority as TaskPriority) || tasks[taskIndex].priority,
    dueDate: dueDate !== undefined ? Number(dueDate) : tasks[taskIndex].dueDate,
    status: (status as TaskStatus) || tasks[taskIndex].status,
    updatedAt: Date.now(),
  };

  tasks[taskIndex] = updatedTask;
  await writeTasks(tasks);

  res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
    return;
  }

  tasks.splice(taskIndex, 1);
  await writeTasks(tasks);

  res.status(204).send();
};
