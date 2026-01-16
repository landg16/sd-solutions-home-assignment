import { useState } from 'react';
import { mockTasks } from '@/data/mock-tasks';
import { TaskCard } from '@/components/task-card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Task } from '@/types/task';
import { AnimatePresence, motion } from 'framer-motion';

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleStatusChange = (id: string, status: 'pending' | 'completed') => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log('Edit task', id);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className='container mx-auto p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Tasks</h1>
          <p className='text-muted-foreground'>Manage your daily tasks and projects.</p>
        </div>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'completed')}
              className='h-10 w-45 appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <option value='all'>All Tasks</option>
              <option value='pending'>Pending</option>
              <option value='completed'>Completed</option>
            </select>
            <ChevronDown className='absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none' />
          </div>
          <Button asChild>
            <Link to='/new'>
              <Plus className='mr-2 h-4 w-4' /> Add Task
            </Link>
          </Button>
        </div>
      </div>

      <motion.div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3' layout>
        <AnimatePresence mode='popLayout'>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TaskCard
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-12 border rounded-lg bg-muted/10 border-dashed'
        >
          <h3 className='text-lg font-semibold'>No tasks found</h3>
          <p className='text-muted-foreground'>
            {filter === 'all'
              ? 'Get started by creating a new task.'
              : `No ${filter} tasks found.`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TasksPage;
