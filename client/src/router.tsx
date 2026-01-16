import { createBrowserRouter } from 'react-router-dom';
import TasksPage from './pages/tasks.tsx';
import CreateTaskPage from './pages/create-task.tsx';
import Layout from './components/layout/layout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TasksPage />,
      },
      {
        path: '/new',
        element: <CreateTaskPage />,
      },
      {
        path: '/edit/:id',
        element: <CreateTaskPage />,
      },
    ],
  },
]);
