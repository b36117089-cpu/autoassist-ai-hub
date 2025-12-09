import { uebaLogs } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Activity, TrendingUp } from 'lucide-react';

const Security = () => {
  const riskData = [35, 42, 28, 45, 85, 52, 38, 29, 44, 31, 48, 36];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">UEBA Security Monitoring</h1>
        <p className="text-muted-foreground">User & Entity Behavior Analytics for AI agents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Shield} label="Total Actions" value="1,247" trend="+12%" color="primary" />
        <StatCard icon={CheckCircle} label="Allowed" value="1,198" trend="+10%" color="success" />
        <StatCard icon={Eye} label="Flagged" value="42" trend="+5%" color="warning" />
        <StatCard icon={XCircle} label="Blocked" value="7" trend="-3%" color="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logs Table */}
        <div className="lg:col-span-2 glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Agent Action Logs
            </h2>
            <span className="text-xs text-muted-foreground">Last 24 hours</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Agent</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Resource</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Risk</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {uebaLogs.map((log) => (
                  <tr key={log.id} className={cn(
                    'border-b border-border/50 hover:bg-muted/30 transition-colors',
                    log.status === 'blocked' && 'bg-destructive/5'
                  )}>
                    <td className="py-3 px-3 text-sm font-mono text-muted-foreground">{log.timestamp}</td>
                    <td className="py-3 px-3">
                      <span className="text-sm text-foreground">{log.agentName}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={cn(
                        'px-2 py-0.5 rounded text-xs font-medium',
                        log.action === 'READ' && 'bg-blue-500/20 text-blue-400',
                        log.action === 'WRITE' && 'bg-green-500/20 text-green-400',
                        log.action === 'MODIFY' && 'bg-orange-500/20 text-orange-400',
                        log.action === 'SEND' && 'bg-purple-500/20 text-purple-400',
                        log.action === 'EXPORT' && 'bg-yellow-500/20 text-yellow-400'
                      )}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-muted-foreground">{log.resource}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              'h-full rounded-full',
                              log.riskScore < 30 && 'bg-success',
                              log.riskScore >= 30 && log.riskScore < 60 && 'bg-warning',
                              log.riskScore >= 60 && 'bg-destructive'
                            )}
                            style={{ width: `${log.riskScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{log.riskScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Risk Score Chart */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Risk Score Timeline
            </h3>
            <div className="h-32 flex items-end gap-1">
              {riskData.map((score, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 rounded-t transition-all duration-300',
                    score < 30 && 'bg-success/60',
                    score >= 30 && score < 60 && 'bg-warning/60',
                    score >= 60 && 'bg-destructive/60'
                  )}
                  style={{ height: `${score}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>12h ago</span>
              <span>Now</span>
            </div>
          </div>

          {/* Unauthorized Access Alerts */}
          <div className="glass-card p-4 border-destructive/30">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Security Alerts
            </h3>
            <div className="space-y-3">
              <AlertCard
                agent="Scheduling Agent"
                action="Attempted PII access"
                time="10:43:55"
                severity="high"
              />
              <AlertCard
                agent="Manufacturing Agent"
                action="Large data export"
                time="10:41:15"
                severity="medium"
              />
            </div>
          </div>

          {/* Agent Behavior Summary */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4">Anomaly Detection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                <span className="text-sm text-foreground">Scheduling Agent</span>
                <span className="text-xs font-medium text-destructive">Anomaly Detected</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-warning/10">
                <span className="text-sm text-foreground">Manufacturing Agent</span>
                <span className="text-xs font-medium text-warning">Under Review</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-sm text-foreground">5 Other Agents</span>
                <span className="text-xs font-medium text-success">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  color: 'primary' | 'success' | 'warning' | 'destructive';
}

const StatCard = ({ icon: Icon, label, value, trend, color }: StatCardProps) => (
  <div className="glass-card p-4">
    <div className="flex items-center gap-3">
      <div className={cn(
        'p-2 rounded-lg',
        color === 'primary' && 'bg-primary/20',
        color === 'success' && 'bg-success/20',
        color === 'warning' && 'bg-warning/20',
        color === 'destructive' && 'bg-destructive/20'
      )}>
        <Icon className={cn(
          'w-5 h-5',
          color === 'primary' && 'text-primary',
          color === 'success' && 'text-success',
          color === 'warning' && 'text-warning',
          color === 'destructive' && 'text-destructive'
        )} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
    <span className={cn(
      'text-xs font-medium',
      trend.startsWith('+') ? 'text-success' : 'text-destructive'
    )}>{trend}</span>
  </div>
);

const StatusBadge = ({ status }: { status: 'allowed' | 'blocked' | 'flagged' }) => {
  const styles = {
    allowed: 'bg-success/20 text-success',
    blocked: 'bg-destructive/20 text-destructive',
    flagged: 'bg-warning/20 text-warning'
  };
  return (
    <span className={cn('px-2 py-0.5 rounded text-xs font-medium capitalize', styles[status])}>
      {status}
    </span>
  );
};

interface AlertCardProps {
  agent: string;
  action: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

const AlertCard = ({ agent, action, time, severity }: AlertCardProps) => (
  <div className={cn(
    'p-3 rounded-lg border',
    severity === 'high' && 'bg-destructive/10 border-destructive/30',
    severity === 'medium' && 'bg-warning/10 border-warning/30',
    severity === 'low' && 'bg-muted/30 border-border'
  )}>
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium text-foreground">{agent}</span>
      <span className="text-xs text-muted-foreground font-mono">{time}</span>
    </div>
    <p className="text-xs text-muted-foreground">{action}</p>
  </div>
);

export default Security;
