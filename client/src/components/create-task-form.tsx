import { useForm } from 'react-hook-form';
import type { Task, TaskPriority, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';

interface CreateTaskFormProps {
  defaultValues?: Partial<Task>;
  onSubmit: (data: CreateTaskFormData) => void;
  isEditing?: boolean;
}

export interface CreateTaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  status: TaskStatus;
}

export function CreateTaskForm({
  defaultValues,
  onSubmit,
  isEditing = false,
}: CreateTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      priority: defaultValues?.priority || 'low',
      dueDate: defaultValues?.dueDate
        ? new Date(defaultValues.dueDate).toISOString().slice(0, 16)
        : undefined,
      status: defaultValues?.status || 'pending',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-2'>
        <label
          htmlFor='title'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-finch-900 dark:text-finch-50'
        >
          Title <span className='text-red-500'>*</span>
        </label>
        <input
          id='title'
          type='text'
          placeholder='Task title'
          {...register('title', { required: 'Title is required' })}
          className='flex h-9 w-full rounded-md border border-finch-200 bg-finch-50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-finch-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-finch-700 dark:bg-finch-900 dark:text-finch-50'
        />
        {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
      </div>

      <div className='space-y-2'>
        <label
          htmlFor='description'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-finch-900 dark:text-finch-50'
        >
          Description
        </label>
        <textarea
          id='description'
          placeholder='Task description (optional)'
          {...register('description')}
          className='flex min-h-25 w-full rounded-md border border-finch-200 bg-finch-50 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-finch-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-finch-700 dark:bg-finch-900 dark:text-finch-50'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <label
            htmlFor='priority'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-finch-900 dark:text-finch-50'
          >
            Priority
          </label>
          <select
            id='priority'
            {...register('priority')}
            className='flex h-9 w-full rounded-md border border-finch-200 bg-finch-50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-finch-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-finch-700 dark:bg-finch-900 dark:text-finch-50'
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>

        <div className='space-y-2'>
          <label
            htmlFor='status'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-finch-900 dark:text-finch-50'
          >
            Status
          </label>
          <select
            id='status'
            {...register('status')}
            className='flex h-9 w-full rounded-md border border-finch-200 bg-finch-50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-finch-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-finch-700 dark:bg-finch-900 dark:text-finch-50'
          >
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
      </div>

      <div className='space-y-2 flex flex-col'>
        <label
          htmlFor='dueDate'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-finch-900 dark:text-finch-50'
        >
          Due Date
        </label>
        <input
          id='dueDate'
          type='datetime-local'
          {...register('dueDate')}
          className='flex h-9 w-full rounded-md border border-finch-200 bg-finch-50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-finch-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-finch-700 dark:bg-finch-900 dark:text-finch-50'
        />
      </div>

      <Button
        type='submit'
        className='w-full bg-finch-600 hover:bg-finch-700 text-white dark:bg-finch-500 dark:hover:bg-finch-400'
      >
        {isEditing ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
}
