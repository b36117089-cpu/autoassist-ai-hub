import { useParams, useNavigate } from 'react-router-dom';
import { vehicles, predictiveAlerts } from '@/data/mockData';
import { maintenanceHistory, componentTrends } from '@/data/extendedMockData';
import { TelemetryGauge } from '@/components/dashboard/TelemetryGauge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Thermometer, 
  Gauge, 
  Battery, 
  Disc, 
  Droplets,
  MapPin,
  Clock,
  Wrench,
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const vehicle = vehicles.find(v => v.id === id);
  const vehicleAlerts = predictiveAlerts.filter(a => a.vehicleId === id);
  const vehicleMaintenance = maintenanceHistory.filter(m => m.vehicleId === id);
  
  if (!vehicle) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="glass-card p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">Vehicle not found</h2>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-success/20 text-success';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{vehicle.name}</h1>
            <p className="text-muted-foreground">{vehicle.model} • {vehicle.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getRiskColor(vehicle.riskLevel)}>
            {vehicle.riskLevel.toUpperCase()} RISK
          </Badge>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button size="sm" className="bg-primary">
            <Calendar className="w-4 h-4 mr-2" /> Schedule Service
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-4xl font-mono font-bold text-primary data-glow">{vehicle.healthScore}</div>
          <p className="text-sm text-muted-foreground mt-1">Health Score</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            {vehicle.location}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Current Location</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-semibold text-foreground">{vehicle.mileage.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground mt-1">Total Miles</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            {vehicle.lastUpdated}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Last Update</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Telemetry Gauges */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary" /> Live Telemetry
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <TelemetryGauge label="Engine Temp" value={vehicle.engineTemp} unit="°C" min={60} max={120} warningThreshold={95} criticalThreshold={105} icon={<Thermometer className="w-4 h-4" />} />
              <TelemetryGauge label="Tyre Pressure" value={vehicle.tyrePressure} unit="psi" min={25} max={40} warningThreshold={30} icon={<Gauge className="w-4 h-4" />} />
              <TelemetryGauge label="Battery Level" value={vehicle.batteryLevel} unit="%" min={0} max={100} warningThreshold={70} icon={<Battery className="w-4 h-4" />} />
              <TelemetryGauge label="Brake Wear" value={vehicle.brakeWear} unit="%" min={0} max={100} warningThreshold={50} criticalThreshold={70} icon={<Disc className="w-4 h-4" />} />
              <TelemetryGauge label="Coolant Level" value={vehicle.coolantLevel} unit="%" min={0} max={100} warningThreshold={85} icon={<Droplets className="w-4 h-4" />} />
            </div>
          </div>
        </div>

        {/* Component Trends Chart */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Component Health Trends
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={componentTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="brakeWear" stroke="hsl(var(--destructive))" name="Brake Wear %" strokeWidth={2} />
                <Line type="monotone" dataKey="batteryHealth" stroke="hsl(var(--primary))" name="Battery %" strokeWidth={2} />
                <Line type="monotone" dataKey="engineEfficiency" stroke="hsl(var(--success))" name="Engine Eff %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Active Alerts
            </h3>
            {vehicleAlerts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No active alerts for this vehicle</p>
            ) : (
              <div className="space-y-3">
                {vehicleAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg bg-card/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{alert.issue}</span>
                      <Badge className={getRiskColor(alert.severity)}>{alert.probability}%</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{alert.component}</span>
                      <span>•</span>
                      <span>Failure in {alert.timeToFailure}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Maintenance History */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" /> Maintenance History
            </h3>
            {vehicleMaintenance.length === 0 ? (
              <p className="text-muted-foreground text-sm">No maintenance records</p>
            ) : (
              <div className="space-y-3 max-h-[250px] overflow-y-auto">
                {vehicleMaintenance.map((record) => (
                  <div key={record.id} className="p-3 rounded-lg bg-card/50 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{record.description}</span>
                      <Badge variant={record.type === 'emergency' ? 'destructive' : record.type === 'repair' ? 'secondary' : 'outline'}>
                        {record.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{record.date} • {record.technician}</span>
                      <span className="font-mono">${record.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
