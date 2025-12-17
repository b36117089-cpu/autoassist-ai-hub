import { Vehicle } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Car, Thermometer, Battery, Gauge, Disc, Droplets, MapPin, ExternalLink, Zap, Fuel, Star, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VehicleCardProps {
  vehicle: Vehicle;
  selected?: boolean;
  onClick?: () => void;
}

const getRiskColor = (risk: Vehicle['riskLevel']) => {
  switch (risk) {
    case 'low': return 'text-success';
    case 'medium': return 'text-warning';
    case 'high': return 'text-orange-500';
    case 'critical': return 'text-destructive';
  }
};

const getRiskBg = (risk: Vehicle['riskLevel']) => {
  switch (risk) {
    case 'low': return 'bg-success/10 border-success/30';
    case 'medium': return 'bg-warning/10 border-warning/30';
    case 'high': return 'bg-orange-500/10 border-orange-500/30';
    case 'critical': return 'bg-destructive/10 border-destructive/30';
  }
};

const getVehicleIcon = (vehicleType: Vehicle['vehicleType']) => {
  switch (vehicleType) {
    case 'electric': return Zap;
    case 'truck': return Truck;
    default: return Car;
  }
};

const getBrandColor = (brand: Vehicle['brand']) => {
  switch (brand) {
    case 'Mahindra': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Tata': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  }
};

export const VehicleCard = ({ vehicle, selected, onClick }: VehicleCardProps) => {
  const navigate = useNavigate();
  const VehicleIcon = getVehicleIcon(vehicle.vehicleType);
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card p-4 cursor-pointer transition-all duration-300 hover:border-primary/50',
        selected && 'border-primary ring-1 ring-primary/30'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg', getRiskBg(vehicle.riskLevel))}>
            <VehicleIcon className={cn('w-5 h-5', getRiskColor(vehicle.riskLevel))} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">{vehicle.name}</h3>
              <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', getBrandColor(vehicle.brand))}>
                {vehicle.brand}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{vehicle.model}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={cn('text-2xl font-mono font-bold', getRiskColor(vehicle.riskLevel))}>
            {vehicle.healthScore}
          </div>
          <p className="text-xs text-muted-foreground uppercase">{vehicle.riskLevel}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-3">
        <MetricMini icon={Thermometer} value={vehicle.engineTemp} unit="°C" warn={vehicle.engineTemp > 100} />
        <MetricMini icon={Gauge} value={vehicle.tyrePressure} unit="psi" warn={vehicle.tyrePressure < 30} />
        <MetricMini icon={Battery} value={vehicle.batteryLevel} unit="%" warn={vehicle.batteryLevel < 70} />
        <MetricMini icon={Disc} value={vehicle.brakeWear} unit="%" warn={vehicle.brakeWear > 60} />
        <MetricMini icon={Droplets} value={vehicle.coolantLevel} unit="%" warn={vehicle.coolantLevel < 80} />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {vehicle.location}
          </div>
          {vehicle.vehicleType !== 'electric' && (
            <div className="flex items-center gap-1">
              <Fuel className="w-3 h-3" />
              {vehicle.fuelEfficiency} km/l
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            {vehicle.driverScore}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>{vehicle.lastUpdated}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vehicle/${vehicle.id}`);
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MetricMiniProps {
  icon: React.ElementType;
  value: number;
  unit: string;
  warn?: boolean;
}

const MetricMini = ({ icon: Icon, value, unit, warn }: MetricMiniProps) => (
  <div className="text-center">
    <Icon className={cn('w-3.5 h-3.5 mx-auto mb-0.5', warn ? 'text-warning' : 'text-muted-foreground')} />
    <span className={cn('text-xs font-mono', warn ? 'text-warning' : 'text-foreground')}>
      {value}
      <span className="text-muted-foreground">{unit}</span>
    </span>
  </div>
);
