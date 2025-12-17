import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicles, predictiveAlerts, agentActivities, Vehicle } from '@/data/mockData';
import { fleetMetricsHistory } from '@/data/extendedMockData';
import { VehicleCard } from '@/components/dashboard/VehicleCard';
import { AlertPanel } from '@/components/dashboard/AlertPanel';
import { AgentActivityPanel } from '@/components/dashboard/AgentActivityPanel';
import { TelemetryGauge } from '@/components/dashboard/TelemetryGauge';
import { Thermometer, Gauge, Battery, Disc, Droplets, RefreshCw, Download, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportFleetReport } from '@/utils/exportPdf';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const brands = ['All Brands', 'Mahindra'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehicles[2]); // VH-003 critical
  const [selectedBrand, setSelectedBrand] = useState('All Brands');

  const filteredVehicles = useMemo(() => {
    if (selectedBrand === 'All Brands') return vehicles;
    return vehicles.filter(v => v.brand === selectedBrand);
  }, [selectedBrand]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fleet Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time vehicle telematics & predictive insights</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Brand Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[140px] h-9 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button 
            size="sm" 
            className="gap-2 bg-primary hover:bg-primary/90"
            onClick={() => {
              exportFleetReport(vehicles, predictiveAlerts, fleetMetricsHistory);
              toast({ title: 'Report Generated', description: 'Fleet report PDF downloaded successfully' });
            }}
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Vehicle List */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4">
          <div className="glass-card p-4 mb-4">
            <h2 className="font-semibold text-foreground mb-1">Fleet Overview</h2>
            <p className="text-sm text-muted-foreground">{filteredVehicles.length} vehicles monitored</p>
          </div>
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-thin">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                selected={selectedVehicle.id === vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
              />
            ))}
          </div>
        </div>

        {/* Center: Telemetry Detail */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-5 space-y-6">
          {/* Selected Vehicle Header */}
          <div className="glass-card p-6 gradient-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedVehicle.name}</h2>
                <p className="text-muted-foreground">{selectedVehicle.model} • {selectedVehicle.id}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-mono font-bold text-primary data-glow">
                  {selectedVehicle.healthScore}
                </div>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{selectedVehicle.mileage.toLocaleString()} miles</span>
              <span>•</span>
              <span>{selectedVehicle.location}</span>
              <span>•</span>
              <span>Updated {selectedVehicle.lastUpdated}</span>
            </div>
          </div>

          {/* Telemetry Gauges */}
          <div className="grid grid-cols-2 gap-4">
            <TelemetryGauge
              label="Engine Temp"
              value={selectedVehicle.engineTemp}
              unit="°C"
              min={60}
              max={120}
              warningThreshold={95}
              criticalThreshold={105}
              icon={<Thermometer className="w-4 h-4" />}
            />
            <TelemetryGauge
              label="Tyre Pressure"
              value={selectedVehicle.tyrePressure}
              unit="psi"
              min={25}
              max={40}
              warningThreshold={30}
              icon={<Gauge className="w-4 h-4" />}
            />
            <TelemetryGauge
              label="Battery Level"
              value={selectedVehicle.batteryLevel}
              unit="%"
              min={0}
              max={100}
              warningThreshold={70}
              icon={<Battery className="w-4 h-4" />}
            />
            <TelemetryGauge
              label="Brake Wear"
              value={selectedVehicle.brakeWear}
              unit="%"
              min={0}
              max={100}
              warningThreshold={50}
              criticalThreshold={70}
              icon={<Disc className="w-4 h-4" />}
            />
            <TelemetryGauge
              label="Coolant Level"
              value={selectedVehicle.coolantLevel}
              unit="%"
              min={0}
              max={100}
              warningThreshold={85}
              icon={<Droplets className="w-4 h-4" />}
            />
          </div>

          {/* Schedule Service Button */}
          <Button 
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            onClick={() => navigate(`/scheduling?vehicleId=${selectedVehicle.id}`)}
          >
            <Calendar className="w-4 h-4" />
            Schedule Service for {selectedVehicle.name}
          </Button>
        </div>

        {/* Right Sidebar: Alerts & Activity */}
        <div className="col-span-12 xl:col-span-3 space-y-6">
          <AlertPanel alerts={predictiveAlerts} />
          <AgentActivityPanel activities={agentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
