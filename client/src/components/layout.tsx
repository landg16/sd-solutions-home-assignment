import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background antialiased">
      <nav className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                Todo App
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Tasks
              </Link>
              <Link to="/new" className="transition-colors hover:text-foreground/80 text-foreground/60">
                New Task
              </Link>
            </nav>
          </div>
        </div>
      </nav>
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
