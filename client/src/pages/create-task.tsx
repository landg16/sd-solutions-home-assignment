import { CreateTaskForm, type CreateTaskFormData } from '@/components/create-task-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { createTask, fetchTask, updateTask } from '@/lib/fetches.ts';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const { data: task, isLoading: isLoadingTask } = useQuery({
    queryKey: ['task', id],
    queryFn: () => fetchTask(id!),
    enabled: isEditing,
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', id] });
      navigate('/');
    },
  });

  const handleSubmit = (data: CreateTaskFormData) => {
    if (isEditing && id) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditing && isLoadingTask) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 max-w-2xl'>
      <h1 className='text-2xl font-bold mb-6 text-finch-900 dark:text-finch-50'>
        {isEditing ? 'Edit Task' : 'Create New Task'}
      </h1>
      <div className='bg-white dark:bg-finch-950 p-6 rounded-lg shadow-md border border-finch-200 dark:border-finch-800'>
        <CreateTaskForm 
          onSubmit={handleSubmit} 
          defaultValues={task}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default CreateTaskPage;
