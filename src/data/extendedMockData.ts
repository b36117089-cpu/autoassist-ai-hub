// Extended Mock Data for new features

// Maintenance History
export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: 'scheduled' | 'repair' | 'emergency';
  description: string;
  cost: number;
  technician: string;
  parts: string[];
  duration: string;
}

export const maintenanceHistory: MaintenanceRecord[] = [
  { id: 'MH-001', vehicleId: 'VH-001', date: '2024-01-10', type: 'scheduled', description: 'Regular oil change and inspection', cost: 150, technician: 'John Smith', parts: ['Oil Filter', 'Synthetic Oil 5W-30'], duration: '1.5 hrs' },
  { id: 'MH-002', vehicleId: 'VH-001', date: '2023-12-05', type: 'repair', description: 'Brake pad replacement - front', cost: 420, technician: 'Mike Johnson', parts: ['Brake Pads (Front)', 'Brake Fluid'], duration: '2 hrs' },
  { id: 'MH-003', vehicleId: 'VH-002', date: '2024-01-08', type: 'emergency', description: 'Battery replacement - roadside', cost: 380, technician: 'Sarah Davis', parts: ['AGM Battery 12V'], duration: '45 min' },
  { id: 'MH-004', vehicleId: 'VH-004', date: '2024-01-05', type: 'scheduled', description: 'Tire rotation and alignment', cost: 120, technician: 'John Smith', parts: [], duration: '1 hr' },
  { id: 'MH-005', vehicleId: 'VH-004', date: '2023-11-20', type: 'repair', description: 'Coolant leak repair', cost: 650, technician: 'Mike Johnson', parts: ['Coolant Reservoir', 'Hoses', 'Coolant'], duration: '3 hrs' },
  { id: 'MH-006', vehicleId: 'VH-003', date: '2024-01-02', type: 'scheduled', description: 'Annual inspection', cost: 80, technician: 'Sarah Davis', parts: [], duration: '1 hr' },
  { id: 'MH-007', vehicleId: 'VH-007', date: '2023-12-28', type: 'repair', description: 'Suspension work', cost: 890, technician: 'John Smith', parts: ['Shock Absorbers', 'Control Arms'], duration: '4 hrs' },
  { id: 'MH-008', vehicleId: 'VH-008', date: '2024-01-12', type: 'scheduled', description: 'Transmission fluid change', cost: 280, technician: 'Mike Johnson', parts: ['Transmission Fluid'], duration: '1.5 hrs' },
];

// Fleet Analytics Data
export interface FleetMetrics {
  month: string;
  totalCost: number;
  maintenanceCost: number;
  fuelCost: number;
  avgHealthScore: number;
  incidentCount: number;
  uptimePercent: number;
}

export const fleetMetricsHistory: FleetMetrics[] = [
  { month: 'Aug', totalCost: 12400, maintenanceCost: 4200, fuelCost: 8200, avgHealthScore: 82, incidentCount: 3, uptimePercent: 94 },
  { month: 'Sep', totalCost: 15800, maintenanceCost: 6800, fuelCost: 9000, avgHealthScore: 79, incidentCount: 5, uptimePercent: 91 },
  { month: 'Oct', totalCost: 11200, maintenanceCost: 3200, fuelCost: 8000, avgHealthScore: 85, incidentCount: 2, uptimePercent: 96 },
  { month: 'Nov', totalCost: 13600, maintenanceCost: 5100, fuelCost: 8500, avgHealthScore: 83, incidentCount: 4, uptimePercent: 93 },
  { month: 'Dec', totalCost: 18200, maintenanceCost: 9200, fuelCost: 9000, avgHealthScore: 76, incidentCount: 7, uptimePercent: 88 },
  { month: 'Jan', totalCost: 14500, maintenanceCost: 5500, fuelCost: 9000, avgHealthScore: 81, incidentCount: 3, uptimePercent: 95 },
];

// Component Health Over Time
export interface ComponentTrend {
  date: string;
  brakeWear: number;
  batteryHealth: number;
  engineEfficiency: number;
  tireCondition: number;
}

export const componentTrends: ComponentTrend[] = [
  { date: 'Week 1', brakeWear: 15, batteryHealth: 95, engineEfficiency: 92, tireCondition: 88 },
  { date: 'Week 2', brakeWear: 22, batteryHealth: 94, engineEfficiency: 91, tireCondition: 85 },
  { date: 'Week 3', brakeWear: 35, batteryHealth: 92, engineEfficiency: 89, tireCondition: 82 },
  { date: 'Week 4', brakeWear: 48, batteryHealth: 89, engineEfficiency: 88, tireCondition: 78 },
  { date: 'Week 5', brakeWear: 58, batteryHealth: 87, engineEfficiency: 86, tireCondition: 75 },
  { date: 'Week 6', brakeWear: 72, batteryHealth: 85, engineEfficiency: 84, tireCondition: 72 },
];

// Notifications
export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  vehicleId?: string;
  actionUrl?: string;
}

export const notifications: Notification[] = [
  { id: 'N-001', type: 'alert', title: 'Critical: Brake Failure Risk', message: 'VH-004 has 87% brake failure probability in 48 hours', timestamp: '2 min ago', read: false, vehicleId: 'VH-004', actionUrl: '/vehicle/VH-004' },
  { id: 'N-002', type: 'warning', title: 'Battery Degradation', message: 'VH-002 battery showing degradation patterns', timestamp: '15 min ago', read: false, vehicleId: 'VH-002' },
  { id: 'N-003', type: 'success', title: 'Service Completed', message: 'VH-001 scheduled maintenance completed successfully', timestamp: '1 hr ago', read: true, vehicleId: 'VH-001' },
  { id: 'N-004', type: 'info', title: 'UEBA Alert', message: 'Unusual agent activity detected and blocked', timestamp: '2 hrs ago', read: true },
  { id: 'N-005', type: 'warning', title: 'Coolant Leak Risk', message: 'VH-008 showing early signs of coolant issues', timestamp: '3 hrs ago', read: true, vehicleId: 'VH-008' },
  { id: 'N-006', type: 'success', title: 'RCA Report Generated', message: 'New root cause analysis available for brake defects', timestamp: '5 hrs ago', read: true },
];

// Performance Scores by Category
export interface PerformanceCategory {
  category: string;
  score: number;
  benchmark: number;
}

export const performanceScores: PerformanceCategory[] = [
  { category: 'Safety', score: 92, benchmark: 85 },
  { category: 'Efficiency', score: 78, benchmark: 80 },
  { category: 'Reliability', score: 85, benchmark: 82 },
  { category: 'Cost Control', score: 71, benchmark: 75 },
  { category: 'Compliance', score: 96, benchmark: 90 },
];

// Failure Prediction Data
export interface FailurePrediction {
  component: string;
  probability: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  vehiclesAffected: number;
}

export const failurePredictions: FailurePrediction[] = [
  { component: 'Brake System', probability: 72, timeframe: '7 days', impact: 'critical', vehiclesAffected: 3 },
  { component: 'Battery', probability: 45, timeframe: '30 days', impact: 'high', vehiclesAffected: 2 },
  { component: 'Cooling System', probability: 38, timeframe: '14 days', impact: 'medium', vehiclesAffected: 2 },
  { component: 'Tires', probability: 28, timeframe: '21 days', impact: 'medium', vehiclesAffected: 4 },
  { component: 'Transmission', probability: 15, timeframe: '60 days', impact: 'high', vehiclesAffected: 1 },
];

// Cost Breakdown
export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export const costBreakdown: CostBreakdown[] = [
  { category: 'Fuel', amount: 52000, percentage: 42 },
  { category: 'Maintenance', amount: 28500, percentage: 23 },
  { category: 'Insurance', amount: 18600, percentage: 15 },
  { category: 'Repairs', amount: 15200, percentage: 12 },
  { category: 'Other', amount: 9700, percentage: 8 },
];
