import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { NotificationsPanel } from '@/components/notifications/NotificationsPanel';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-end px-6 gap-4">
          <ThemeToggle />
          <NotificationsPanel />
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
