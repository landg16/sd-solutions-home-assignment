import { Outlet, Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { ModeToggle } from '@/components/layout/mode-toggle.tsx';

const Layout = () => {
  return (
    <div className='min-h-screen bg-background antialiased'>
      <nav className='border-b border-finch-200 dark:border-finch-800'>
        <div className='container mx-auto flex h-16 items-center px-4'>
          <div className='mr-4 hidden md:flex justify-between w-full'>
            <div className='flex items-center'>
              <Link to='/' className='mr-6 flex items-center gap-3 space-x-2 group'>
                <span className='bg-finch-100 dark:bg-finch-800 transition-colors duration-300 rounded-full p-2 group-hover:bg-finch-300 dark:group-hover:bg-finch-700'>
                  <Bookmark />
                </span>
                Task Management Dashboard
              </Link>
              <nav className='flex items-center space-x-6 text-sm font-medium'>
                <Link
                  to='/'
                  className='transition-colors hover:text-foreground/80 text-foreground/60'
                >
                  All Tasks
                </Link>
              </nav>
            </div>
            <div className='flex items-center gap-2'>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
      <main className='container mx-auto py-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
