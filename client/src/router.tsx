import { createBrowserRouter, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import TasksPage from './pages/tasks.tsx';
import CreateTaskPage from './pages/create-task.tsx';
import Layout from './components/layout/layout.tsx';

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-500">
          <i>{error.statusText || error.data?.message}</i>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500">
        <i>{(error as Error)?.message || 'Unknown error'}</i>
      </p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
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
