import { rcaItems } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileSearch, TrendingUp, TrendingDown, Minus, Send, Wrench, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Insights = () => {
  const trendData = [
    { month: 'Jul', brake: 12, battery: 8, coolant: 5 },
    { month: 'Aug', brake: 18, battery: 10, coolant: 7 },
    { month: 'Sep', brake: 22, battery: 9, coolant: 4 },
    { month: 'Oct', brake: 28, battery: 15, coolant: 6 },
    { month: 'Nov', brake: 35, battery: 18, coolant: 8 },
    { month: 'Dec', brake: 42, battery: 22, coolant: 9 },
  ];

  const maxValue = Math.max(...trendData.flatMap(d => [d.brake, d.battery, d.coolant]));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">RCA/CAPA Insights</h1>
          <p className="text-muted-foreground">Root Cause Analysis & Corrective Actions</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Send className="w-4 h-4" />
          Send to Manufacturing
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">355</p>
              <p className="text-xs text-muted-foreground">Total Defects</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">CAPA Actions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Defect List & RCA Cards */}
        <div className="lg:col-span-2 space-y-4">
          {rcaItems.map((item) => (
            <div key={item.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{item.defectType}</h3>
                    <StatusBadge status={item.status} />
                    <TrendIndicator trend={item.trend} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.occurrences} occurrences • Affecting {item.affectedModels.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-warning">{item.occurrences}</span>
                  <p className="text-xs text-muted-foreground">cases</p>
                </div>
              </div>

              {/* Root Cause Card */}
              <div className="p-4 rounded-lg bg-muted/30 mb-4">
                <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Root Cause</h4>
                <p className="text-sm text-foreground">{item.rootCause}</p>
              </div>

              {/* Corrective Action Card */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="text-xs font-medium text-primary uppercase mb-2 flex items-center gap-1">
                  <Wrench className="w-3 h-3" />
                  AI-Generated Corrective Action
                </h4>
                <p className="text-sm text-foreground">{item.correctiveAction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trend Charts */}
        <div className="space-y-6">
          {/* Failure Frequency Chart */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Failure Frequency Trends
            </h3>
            <div className="space-y-4">
              {/* Chart */}
              <div className="h-48 flex items-end gap-2">
                {trendData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-0.5" style={{ height: '160px' }}>
                      <div 
                        className="w-full bg-destructive/60 rounded-t transition-all duration-300"
                        style={{ height: `${(data.brake / maxValue) * 100}%` }}
                      />
                      <div 
                        className="w-full bg-warning/60 rounded transition-all duration-300"
                        style={{ height: `${(data.battery / maxValue) * 100}%` }}
                      />
                      <div 
                        className="w-full bg-primary/60 rounded-b transition-all duration-300"
                        style={{ height: `${(data.coolant / maxValue) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-destructive/60 rounded" /> Brake</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-warning/60 rounded" /> Battery</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary/60 rounded" /> Coolant</span>
              </div>
            </div>
          </div>

          {/* Top Recurring Defects */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-primary" />
              Top Recurring Defects
            </h3>
            <div className="space-y-3">
              {rcaItems.slice(0, 4).map((item, i) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.defectType}</p>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(item.occurrences / 156) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{item.occurrences}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Required */}
          <div className="glass-card p-4 border-warning/30">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Action Required
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              2 defect patterns require immediate attention from the manufacturing team.
            </p>
            <Button className="w-full gap-2" variant="outline">
              <Send className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: 'open' | 'in-progress' | 'resolved' }) => {
  const styles = {
    'open': 'bg-destructive/20 text-destructive',
    'in-progress': 'bg-warning/20 text-warning',
    'resolved': 'bg-success/20 text-success'
  };
  const labels = {
    'open': 'Open',
    'in-progress': 'In Progress',
    'resolved': 'Resolved'
  };
  return (
    <span className={cn('px-2 py-0.5 rounded text-xs font-medium', styles[status])}>
      {labels[status]}
    </span>
  );
};

const TrendIndicator = ({ trend }: { trend: 'increasing' | 'stable' | 'decreasing' }) => {
  if (trend === 'increasing') return <TrendingUp className="w-4 h-4 text-destructive" />;
  if (trend === 'decreasing') return <TrendingDown className="w-4 h-4 text-success" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

export default Insights;
