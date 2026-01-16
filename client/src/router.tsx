import { createBrowserRouter } from 'react-router-dom';
import TasksPage from './pages/tasks-page.tsx';
import TaskFormPage from './pages/task-form-page.tsx';
import Layout from './components/layout.tsx';

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
        element: <TaskFormPage />,
      },
      {
        path: '/edit/:id',
        element: <TaskFormPage />,
      },
    ],
  },
]);
