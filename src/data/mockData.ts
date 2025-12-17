// Vehicle Telematics Data
export interface Vehicle {
  id: string;
  name: string;
  model: string;
  brand: 'Mahindra';
  engineTemp: number;
  tyrePressure: number;
  batteryLevel: number;
  brakeWear: number;
  coolantLevel: number;
  healthScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  mileage: number;
  location: string;
  fuelEfficiency: number;
  driverScore: number;
  vehicleType: 'suv' | 'sedan' | 'truck' | 'electric';
}

export const vehicles: Vehicle[] = [
  { id: 'VH-001', name: 'Fleet Alpha 1', model: 'XUV700', brand: 'Mahindra', vehicleType: 'suv', engineTemp: 92, tyrePressure: 34, batteryLevel: 87, brakeWear: 28, coolantLevel: 95, healthScore: 94, riskLevel: 'low', lastUpdated: '2 min ago', mileage: 45230, location: 'Mumbai', fuelEfficiency: 14.2, driverScore: 92 },
  { id: 'VH-002', name: 'Fleet Alpha 2', model: 'Thar', brand: 'Mahindra', vehicleType: 'suv', engineTemp: 98, tyrePressure: 31, batteryLevel: 72, brakeWear: 65, coolantLevel: 88, healthScore: 68, riskLevel: 'high', lastUpdated: '1 min ago', mileage: 89120, location: 'Delhi', fuelEfficiency: 11.5, driverScore: 74 },
  { id: 'VH-003', name: 'Fleet Beta 1', model: 'Scorpio-N', brand: 'Mahindra', vehicleType: 'suv', engineTemp: 105, tyrePressure: 28, batteryLevel: 65, brakeWear: 72, coolantLevel: 78, healthScore: 52, riskLevel: 'critical', lastUpdated: '30 sec ago', mileage: 112340, location: 'Chennai', fuelEfficiency: 10.8, driverScore: 65 },
  { id: 'VH-004', name: 'Fleet Gamma 1', model: 'Bolero', brand: 'Mahindra', vehicleType: 'suv', engineTemp: 94, tyrePressure: 30, batteryLevel: 78, brakeWear: 48, coolantLevel: 85, healthScore: 76, riskLevel: 'medium', lastUpdated: '2 min ago', mileage: 78450, location: 'Hyderabad', fuelEfficiency: 12.3, driverScore: 78 },
  { id: 'VH-005', name: 'Fleet Delta 1', model: 'XUV400 EV', brand: 'Mahindra', vehicleType: 'electric', engineTemp: 45, tyrePressure: 35, batteryLevel: 89, brakeWear: 22, coolantLevel: 94, healthScore: 91, riskLevel: 'low', lastUpdated: '1 min ago', mileage: 34560, location: 'Kolkata', fuelEfficiency: 0, driverScore: 95 },
  { id: 'VH-006', name: 'Fleet Epsilon 1', model: 'BE 6e', brand: 'Mahindra', vehicleType: 'electric', engineTemp: 42, tyrePressure: 34, batteryLevel: 95, brakeWear: 12, coolantLevel: 98, healthScore: 97, riskLevel: 'low', lastUpdated: '1 min ago', mileage: 18920, location: 'Jaipur', fuelEfficiency: 0, driverScore: 96 },
];

// Predictive Alerts
export interface PredictiveAlert {
  id: string;
  vehicleId: string;
  issue: string;
  probability: number;
  timeToFailure: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  component: string;
}

export const predictiveAlerts: PredictiveAlert[] = [
  { id: 'ALT-001', vehicleId: 'VH-003', issue: 'Brake Pad Failure', probability: 87, timeToFailure: '48 hours', severity: 'critical', component: 'Braking System' },
  { id: 'ALT-002', vehicleId: 'VH-002', issue: 'Battery Degradation', probability: 72, timeToFailure: '5 days', severity: 'high', component: 'Power System' },
  { id: 'ALT-003', vehicleId: 'VH-004', issue: 'Tyre Wear Warning', probability: 54, timeToFailure: '14 days', severity: 'medium', component: 'Suspension' },
  { id: 'ALT-004', vehicleId: 'VH-005', issue: 'Battery Charge Anomaly', probability: 35, timeToFailure: '14 days', severity: 'medium', component: 'EV Battery Pack' },
];

// Agent Activity
export interface AgentActivity {
  id: string;
  agentName: string;
  agentType: 'master' | 'worker';
  action: string;
  timestamp: string;
  status: 'success' | 'pending' | 'blocked';
}

export const agentActivities: AgentActivity[] = [
  { id: 'AG-001', agentName: 'Master Orchestrator', agentType: 'master', action: 'Dispatched diagnosis task for VH-003', timestamp: '10:45:23', status: 'success' },
  { id: 'AG-002', agentName: 'Diagnosis Agent', agentType: 'worker', action: 'Analyzing brake wear patterns', timestamp: '10:45:25', status: 'pending' },
  { id: 'AG-003', agentName: 'Data Analysis Agent', agentType: 'worker', action: 'Processing telematics stream', timestamp: '10:45:20', status: 'success' },
  { id: 'AG-004', agentName: 'Customer Engagement', agentType: 'worker', action: 'Prepared alert for VH-003 owner', timestamp: '10:45:30', status: 'success' },
  { id: 'AG-005', agentName: 'UEBA Agent', agentType: 'worker', action: 'Monitoring agent behaviors', timestamp: '10:45:32', status: 'success' },
  { id: 'AG-006', agentName: 'Fleet Optimizer', agentType: 'worker', action: 'Optimizing route for Mahindra fleet', timestamp: '10:46:00', status: 'success' },
  { id: 'AG-007', agentName: 'EV Analytics Agent', agentType: 'worker', action: 'Analyzing charging patterns for EVs', timestamp: '10:46:15', status: 'pending' },
];

// Service Slots
export interface ServiceSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  recommended: boolean;
  centerName: string;
  distance: string;
  technicianCount: number;
}

export const serviceSlots: ServiceSlot[] = [
  { id: 'SL-001', date: '2024-01-15', time: '09:00 AM', available: true, recommended: false, centerName: 'Mahindra First Choice', distance: '2.3 km', technicianCount: 3 },
  { id: 'SL-002', date: '2024-01-15', time: '10:30 AM', available: true, recommended: true, centerName: 'Mahindra First Choice', distance: '2.3 km', technicianCount: 4 },
  { id: 'SL-003', date: '2024-01-15', time: '02:00 PM', available: true, recommended: false, centerName: 'Mahindra Authorized Service', distance: '4.1 km', technicianCount: 2 },
  { id: 'SL-004', date: '2024-01-16', time: '11:00 AM', available: true, recommended: false, centerName: 'Mahindra Authorized Service', distance: '5.5 km', technicianCount: 3 },
  { id: 'SL-005', date: '2024-01-16', time: '03:30 PM', available: false, recommended: false, centerName: 'Mahindra Express Service', distance: '3.8 km', technicianCount: 5 },
];

// UEBA Logs
export interface UEBALog {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  resource: string;
  status: 'allowed' | 'blocked' | 'flagged';
  riskScore: number;
  details: string;
}

export const uebaLogs: UEBALog[] = [
  { id: 'UE-001', timestamp: '10:45:32', agentId: 'AG-DIAG', agentName: 'Diagnosis Agent', action: 'READ', resource: 'vehicle_telematics', status: 'allowed', riskScore: 5, details: 'Standard telemetry access' },
  { id: 'UE-002', timestamp: '10:44:18', agentId: 'AG-DATA', agentName: 'Data Analysis', action: 'WRITE', resource: 'prediction_cache', status: 'allowed', riskScore: 12, details: 'Updated prediction model' },
  { id: 'UE-003', timestamp: '10:43:55', agentId: 'AG-SCHED', agentName: 'Scheduling Agent', action: 'MODIFY', resource: 'customer_data', status: 'blocked', riskScore: 85, details: 'Attempted unauthorized PII access' },
  { id: 'UE-004', timestamp: '10:42:30', agentId: 'AG-ENG', agentName: 'Customer Engagement', action: 'SEND', resource: 'notification_api', status: 'allowed', riskScore: 8, details: 'Alert dispatched to customer' },
  { id: 'UE-005', timestamp: '10:41:15', agentId: 'AG-MFG', agentName: 'Manufacturing Agent', action: 'EXPORT', resource: 'defect_database', status: 'flagged', riskScore: 45, details: 'Large data export detected' },
];

// RCA/CAPA Data
export interface RCAItem {
  id: string;
  defectType: string;
  occurrences: number;
  rootCause: string;
  affectedModels: string[];
  correctiveAction: string;
  status: 'open' | 'in-progress' | 'resolved';
  trend: 'increasing' | 'stable' | 'decreasing';
}

export const rcaItems: RCAItem[] = [
  { id: 'RCA-001', defectType: 'Brake Pad Premature Wear', occurrences: 156, rootCause: 'Material composition variance in batch #2847', affectedModels: ['XUV700', 'Scorpio-N'], correctiveAction: 'Replace brake compound supplier, recall affected batches', status: 'in-progress', trend: 'increasing' },
  { id: 'RCA-002', defectType: 'Battery Cell Degradation', occurrences: 89, rootCause: 'Thermal management software bug v2.3.1', affectedModels: ['XUV400 EV', 'BE 6e'], correctiveAction: 'OTA update for thermal algorithm, cell replacement program', status: 'open', trend: 'stable' },
  { id: 'RCA-003', defectType: 'Coolant Reservoir Crack', occurrences: 43, rootCause: 'Injection molding temperature deviation', affectedModels: ['Thar', 'Bolero'], correctiveAction: 'Quality gate added, supplier audit scheduled', status: 'resolved', trend: 'decreasing' },
  { id: 'RCA-004', defectType: 'EV Charging Port Malfunction', occurrences: 28, rootCause: 'Water ingress in charging module', affectedModels: ['XUV400 EV', 'BE 6e'], correctiveAction: 'Improved sealing, component replacement', status: 'open', trend: 'increasing' },
];

// Chat messages for voice assistant
export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export const chatHistory: ChatMessage[] = [
  { id: 'CH-001', role: 'ai', content: 'Hello! I detected a brake pad wear risk in your Mahindra Scorpio-N (VH-003) with an 87% failure probability in the next 48 hours. Would you like me to arrange a service appointment?', timestamp: '10:45:00' },
  { id: 'CH-002', role: 'user', content: 'Yes, please schedule it.', timestamp: '10:45:15' },
  { id: 'CH-003', role: 'ai', content: 'Great! I recommend 10:30 AM tomorrow at Mahindra First Choice, just 2.3 km from your location. They have 4 certified technicians available. Should I confirm this slot?', timestamp: '10:45:18' },
  { id: 'CH-004', role: 'user', content: 'Yes, confirm it.', timestamp: '10:45:25' },
  { id: 'CH-005', role: 'ai', content: 'Your service is confirmed for tomorrow at 10:30 AM. I\'ll send you a reminder 1 hour before. Is there anything else I can help you with?', timestamp: '10:45:28' },
];

// Fleet Statistics
export interface FleetStats {
  totalVehicles: number;
  mahindraVehicles: number;
  evVehicles: number;
  avgHealthScore: number;
  criticalAlerts: number;
  scheduledServices: number;
}

export const fleetStats: FleetStats = {
  totalVehicles: 6,
  mahindraVehicles: 6,
  evVehicles: 2,
  avgHealthScore: 80,
  criticalAlerts: 1,
  scheduledServices: 4,
};

// Driver Performance Data
export interface DriverPerformance {
  vehicleId: string;
  driverName: string;
  safetyScore: number;
  fuelEfficiencyScore: number;
  onTimeDelivery: number;
  totalTrips: number;
  incidents: number;
}

export const driverPerformance: DriverPerformance[] = [
  { vehicleId: 'VH-001', driverName: 'Rajesh Kumar', safetyScore: 92, fuelEfficiencyScore: 88, onTimeDelivery: 95, totalTrips: 245, incidents: 0 },
  { vehicleId: 'VH-002', driverName: 'Amit Singh', safetyScore: 74, fuelEfficiencyScore: 65, onTimeDelivery: 82, totalTrips: 198, incidents: 3 },
  { vehicleId: 'VH-003', driverName: 'Vikram Patel', safetyScore: 65, fuelEfficiencyScore: 58, onTimeDelivery: 78, totalTrips: 156, incidents: 5 },
  { vehicleId: 'VH-004', driverName: 'Manoj Gupta', safetyScore: 78, fuelEfficiencyScore: 72, onTimeDelivery: 85, totalTrips: 203, incidents: 2 },
  { vehicleId: 'VH-005', driverName: 'Kavita Nair', safetyScore: 95, fuelEfficiencyScore: 96, onTimeDelivery: 98, totalTrips: 167, incidents: 0 },
  { vehicleId: 'VH-006', driverName: 'Anita Joshi', safetyScore: 96, fuelEfficiencyScore: 94, onTimeDelivery: 97, totalTrips: 145, incidents: 0 },
];