import { useState } from 'react';
import { TaskCard } from '@/components/task-card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, fetchTasks, updateTaskStatus } from '@/lib/fetches.ts';

const TasksPage = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks', filter],
    queryFn: () => fetchTasks(filter),
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: updateTaskStatus,
    onMutate: (variables) => {
      setUpdatingTaskId(variables.id);
    },
    onSettled: () => {
      setUpdatingTaskId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutate: removeTask } = useMutation({
    mutationFn: deleteTask,
    onMutate: (id) => {
      setDeletingTaskId(id);
    },
    onSettled: () => {
      setDeletingTaskId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleStatusChange = (id: string, status: 'pending' | 'completed') => {
    updateStatus({ id, status });
  };

  const handleDelete = (id: string) => {
    removeTask(id);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (isError) {
    return (
      <div className='container mx-auto p-4 flex justify-center items-center h-[50vh]'>
        <div className='text-center text-destructive'>
          <h3 className='text-lg font-semibold'>Error loading tasks</h3>
          <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

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

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      ) : (
        <motion.div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3' layout>
          <AnimatePresence mode='popLayout'>
            {tasks.map((task) => (
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
                  isUpdating={updatingTaskId === task.id}
                  isDeleting={deletingTaskId === task.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!isLoading && tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-12 border rounded-lg bg-muted/10 border-dashed'
        >
          <h3 className='text-lg font-semibold'>No tasks found</h3>
          <p className='text-muted-foreground'>
            {filter === 'all' ? 'Get started by creating a new task.' : `No ${filter} tasks found.`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TasksPage;
