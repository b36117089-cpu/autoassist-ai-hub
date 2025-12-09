import { AgentActivity } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Bot, Brain, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface AgentActivityPanelProps {
  activities: AgentActivity[];
}

const getStatusIcon = (status: AgentActivity['status']) => {
  switch (status) {
    case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-success" />;
    case 'pending': return <Clock className="w-3.5 h-3.5 text-warning animate-pulse" />;
    case 'blocked': return <XCircle className="w-3.5 h-3.5 text-destructive" />;
  }
};

export const AgentActivityPanel = ({ activities }: AgentActivityPanelProps) => {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          Agent Activity
        </h2>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn(
              'p-1.5 rounded-md',
              activity.agentType === 'master' ? 'bg-primary/20' : 'bg-secondary'
            )}>
              <Bot className={cn(
                'w-4 h-4',
                activity.agentType === 'master' ? 'text-primary' : 'text-muted-foreground'
              )} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground truncate">
                  {activity.agentName}
                </span>
                {activity.agentType === 'master' && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded">
                    MASTER
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
            </div>

            <div className="flex items-center gap-2">
              {getStatusIcon(activity.status)}
              <span className="text-xs text-muted-foreground font-mono">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
