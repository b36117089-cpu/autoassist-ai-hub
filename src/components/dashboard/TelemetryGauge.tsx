import { cn } from '@/lib/utils';

interface TelemetryGaugeProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningThreshold?: number;
  criticalThreshold?: number;
  icon: React.ReactNode;
}

export const TelemetryGauge = ({
  label,
  value,
  unit,
  min,
  max,
  warningThreshold,
  criticalThreshold,
  icon
}: TelemetryGaugeProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const getColor = () => {
    if (criticalThreshold && value >= criticalThreshold) return 'text-destructive';
    if (warningThreshold && value >= warningThreshold) return 'text-warning';
    return 'text-success';
  };

  const getBarColor = () => {
    if (criticalThreshold && value >= criticalThreshold) return 'bg-gradient-to-r from-destructive to-red-400';
    if (warningThreshold && value >= warningThreshold) return 'bg-gradient-to-r from-warning to-yellow-400';
    return 'bg-gradient-to-r from-success to-emerald-400';
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icon}</div>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <div className={cn('text-xl font-mono font-bold data-glow', getColor())}>
          {value}
          <span className="text-xs text-muted-foreground ml-1">{unit}</span>
        </div>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', getBarColor())}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
