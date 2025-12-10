import { useState } from 'react';
import { vehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GitCompare, 
  Thermometer, 
  Gauge, 
  Battery, 
  Disc, 
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const FleetComparison = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(['VH-001', 'VH-004']);

  const toggleVehicle = (id: string) => {
    if (selectedVehicles.includes(id)) {
      setSelectedVehicles(selectedVehicles.filter(v => v !== id));
    } else if (selectedVehicles.length < 4) {
      setSelectedVehicles([...selectedVehicles, id]);
    }
  };

  const selectedData = vehicles.filter(v => selectedVehicles.includes(v.id));

  const radarData = [
    { metric: 'Health Score', ...Object.fromEntries(selectedData.map(v => [v.id, v.healthScore])) },
    { metric: 'Battery', ...Object.fromEntries(selectedData.map(v => [v.id, v.batteryLevel])) },
    { metric: 'Coolant', ...Object.fromEntries(selectedData.map(v => [v.id, v.coolantLevel])) },
    { metric: 'Brake Health', ...Object.fromEntries(selectedData.map(v => [v.id, 100 - v.brakeWear])) },
    { metric: 'Tire Press.', ...Object.fromEntries(selectedData.map(v => [v.id, (v.tyrePressure / 40) * 100])) },
  ];

  const colors = ['hsl(var(--primary))', 'hsl(var(--destructive))', 'hsl(var(--success))', 'hsl(217, 91%, 60%)'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-success/20 text-success';
    }
  };

  const getTrendIcon = (val1: number, val2: number) => {
    if (val1 > val2) return <TrendingUp className="w-4 h-4 text-success" />;
    if (val1 < val2) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GitCompare className="w-7 h-7 text-primary" />
            Fleet Comparison
          </h1>
          <p className="text-muted-foreground">Compare up to 4 vehicles side-by-side</p>
        </div>
        <Button variant="outline" onClick={() => setSelectedVehicles([])}>
          Clear Selection
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Vehicle Selection */}
        <div className="col-span-12 lg:col-span-3">
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-3">Select Vehicles ({selectedVehicles.length}/4)</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {vehicles.map((vehicle) => (
                <label
                  key={vehicle.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedVehicles.includes(vehicle.id)
                      ? 'bg-primary/10 border border-primary/30'
                      : 'bg-card/50 border border-border hover:bg-card'
                  }`}
                >
                  <Checkbox
                    checked={selectedVehicles.includes(vehicle.id)}
                    onCheckedChange={() => toggleVehicle(vehicle.id)}
                    disabled={!selectedVehicles.includes(vehicle.id) && selectedVehicles.length >= 4}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{vehicle.name}</p>
                    <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                  </div>
                  <Badge className={getRiskColor(vehicle.riskLevel)} variant="outline">
                    {vehicle.healthScore}
                  </Badge>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison View */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {selectedData.length < 2 ? (
            <div className="glass-card p-12 text-center">
              <GitCompare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Select at least 2 vehicles</h3>
              <p className="text-muted-foreground">Choose vehicles from the list to compare their metrics</p>
            </div>
          ) : (
            <>
              {/* Radar Chart */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Performance Comparison</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                    {selectedData.map((vehicle, index) => (
                      <Radar
                        key={vehicle.id}
                        name={vehicle.name}
                        dataKey={vehicle.id}
                        stroke={colors[index]}
                        fill={colors[index]}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    ))}
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Metrics Table */}
              <div className="glass-card p-6 overflow-x-auto">
                <h3 className="font-semibold text-foreground mb-4">Detailed Metrics</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Metric</th>
                      {selectedData.map((vehicle, index) => (
                        <th key={vehicle.id} className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                            <span className="text-foreground font-medium">{vehicle.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Health Score', key: 'healthScore', icon: TrendingUp, unit: '' },
                      { label: 'Engine Temp', key: 'engineTemp', icon: Thermometer, unit: '°C' },
                      { label: 'Battery Level', key: 'batteryLevel', icon: Battery, unit: '%' },
                      { label: 'Brake Wear', key: 'brakeWear', icon: Disc, unit: '%' },
                      { label: 'Tyre Pressure', key: 'tyrePressure', icon: Gauge, unit: ' psi' },
                      { label: 'Coolant Level', key: 'coolantLevel', icon: Droplets, unit: '%' },
                      { label: 'Mileage', key: 'mileage', icon: TrendingUp, unit: ' mi' },
                    ].map((metric) => (
                      <tr key={metric.key} className="border-b border-border/50">
                        <td className="py-3 px-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <metric.icon className="w-4 h-4" />
                            {metric.label}
                          </div>
                        </td>
                        {selectedData.map((vehicle, index) => {
                          const value = vehicle[metric.key as keyof typeof vehicle];
                          const otherValues = selectedData.filter((_, i) => i !== index).map(v => v[metric.key as keyof typeof v] as number);
                          const maxOther = Math.max(...otherValues);
                          return (
                            <td key={vehicle.id} className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <span className="font-mono text-foreground">
                                  {typeof value === 'number' ? value.toLocaleString() : value}{metric.unit}
                                </span>
                                {metric.key !== 'mileage' && metric.key !== 'brakeWear' && selectedData.length > 1 && (
                                  getTrendIcon(value as number, maxOther)
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetComparison;
