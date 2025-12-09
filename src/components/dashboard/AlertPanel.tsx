import { PredictiveAlert } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';

interface AlertPanelProps {
  alerts: PredictiveAlert[];
}

const getSeverityStyles = (severity: PredictiveAlert['severity']) => {
  switch (severity) {
    case 'critical': return { bg: 'bg-destructive/10 border-destructive/30', text: 'text-destructive', badge: 'bg-destructive' };
    case 'high': return { bg: 'bg-orange-500/10 border-orange-500/30', text: 'text-orange-500', badge: 'bg-orange-500' };
    case 'medium': return { bg: 'bg-warning/10 border-warning/30', text: 'text-warning', badge: 'bg-warning' };
    case 'low': return { bg: 'bg-muted border-border', text: 'text-muted-foreground', badge: 'bg-muted-foreground' };
  }
};

export const AlertPanel = ({ alerts }: AlertPanelProps) => {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Predictive Alerts
        </h2>
        <span className="text-xs text-muted-foreground">{alerts.length} active</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          return (
            <div
              key={alert.id}
              className={cn('p-3 rounded-lg border', styles.bg)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={cn('font-medium text-sm', styles.text)}>{alert.issue}</h3>
                  <p className="text-xs text-muted-foreground">{alert.vehicleId} • {alert.component}</p>
                </div>
                <div className={cn('px-2 py-0.5 rounded text-xs font-medium text-primary-foreground', styles.badge)}>
                  {alert.severity}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-muted-foreground" />
                  <span className={cn('font-mono font-bold', styles.text)}>{alert.probability}%</span>
                  <span className="text-muted-foreground">probability</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">in {alert.timeToFailure}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
