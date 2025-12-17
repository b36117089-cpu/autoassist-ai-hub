import { NavLink } from '@/components/NavLink';
import { 
  LayoutDashboard, 
  Mic, 
  Calendar, 
  Shield, 
  FileSearch,
  Bot,
  ChevronLeft,
  Activity,
  BarChart3,
  GitCompare
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: GitCompare, label: 'Compare', path: '/compare' },
  { icon: Mic, label: 'Voice Assistant', path: '/voice' },
  { icon: Calendar, label: 'Scheduling', path: '/scheduling' },
  { icon: Shield, label: 'UEBA Security', path: '/security' },
  { icon: FileSearch, label: 'RCA/CAPA', path: '/insights' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AutoAssist</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200',
              collapsed && 'justify-center'
            )}
            activeClassName="bg-sidebar-accent text-primary"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Agent Status */}
      <div className={cn('p-4 border-t border-sidebar-border', collapsed && 'px-2')}>
        <div className={cn('glass-card p-3', collapsed && 'p-2')}>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="w-5 h-5 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full animate-pulse" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">AI Agents Active</p>
                <p className="text-xs text-muted-foreground">7 workers online</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
