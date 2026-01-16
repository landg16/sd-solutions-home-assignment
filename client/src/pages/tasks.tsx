import { useState } from 'react';
import { mockTasks } from '@/data/mock-tasks';
import { TaskCard } from '@/components/task-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Task } from '@/types/task';

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleStatusChange = (id: string, status: 'pending' | 'completed') => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log('Edit task', id);
    // Navigation will be handled by Link or useNavigate in a real app context if needed,
    // but for now we just log it or we can use the router to navigate.
    // Since we are inside a component, we might want to use useNavigate, but let's keep it simple.
  };

  return (
    <div className='container mx-auto p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Tasks</h1>
          <p className='text-muted-foreground'>Manage your daily tasks and projects.</p>
        </div>
        <Button asChild>
          <Link to='/new'>
            <Plus className='mr-2 h-4 w-4' /> Add Task
          </Link>
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className='text-center py-12 border rounded-lg bg-muted/10 border-dashed'>
          <h3 className='text-lg font-semibold'>No tasks found</h3>
          <p className='text-muted-foreground'>Get started by creating a new task.</p>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
