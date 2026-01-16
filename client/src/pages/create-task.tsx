import { CreateTaskForm, type CreateTaskFormData } from '@/components/create-task-form';
import { useNavigate } from 'react-router-dom';

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleCreateTask = (data: CreateTaskFormData) => {
    console.log('Task created:', data);
    navigate('/');
  };

  return (
    <div className='container mx-auto p-4 max-w-2xl'>
      <h1 className='text-2xl font-bold mb-6 text-finch-900 dark:text-finch-50'>Create New Task</h1>
      <div className='bg-white dark:bg-finch-950 p-6 rounded-lg shadow-md border border-finch-200 dark:border-finch-800'>
        <CreateTaskForm onSubmit={handleCreateTask} />
      </div>
    </div>
  );
};

export default CreateTaskPage;
