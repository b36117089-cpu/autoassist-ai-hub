// Vehicle Telematics Data
export interface Vehicle {
  id: string;
  name: string;
  model: string;
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
}

export const vehicles: Vehicle[] = [
  { id: 'VH-001', name: 'Fleet Alpha 1', model: 'Tesla Model Y', engineTemp: 92, tyrePressure: 34, batteryLevel: 87, brakeWear: 28, coolantLevel: 95, healthScore: 94, riskLevel: 'low', lastUpdated: '2 min ago', mileage: 45230, location: 'Bay Area' },
  { id: 'VH-002', name: 'Fleet Alpha 2', model: 'Ford F-150', engineTemp: 98, tyrePressure: 31, batteryLevel: 72, brakeWear: 65, coolantLevel: 88, healthScore: 68, riskLevel: 'high', lastUpdated: '1 min ago', mileage: 89120, location: 'Seattle' },
  { id: 'VH-003', name: 'Fleet Beta 1', model: 'Chevy Bolt', engineTemp: 88, tyrePressure: 33, batteryLevel: 91, brakeWear: 15, coolantLevel: 97, healthScore: 96, riskLevel: 'low', lastUpdated: '3 min ago', mileage: 23450, location: 'Portland' },
  { id: 'VH-004', name: 'Fleet Beta 2', model: 'RAM 1500', engineTemp: 105, tyrePressure: 28, batteryLevel: 65, brakeWear: 72, coolantLevel: 78, healthScore: 52, riskLevel: 'critical', lastUpdated: '30 sec ago', mileage: 112340, location: 'Denver' },
  { id: 'VH-005', name: 'Fleet Gamma 1', model: 'Toyota Camry', engineTemp: 90, tyrePressure: 32, batteryLevel: 82, brakeWear: 35, coolantLevel: 92, healthScore: 85, riskLevel: 'low', lastUpdated: '5 min ago', mileage: 67890, location: 'Phoenix' },
  { id: 'VH-006', name: 'Fleet Gamma 2', model: 'Honda Accord', engineTemp: 94, tyrePressure: 30, batteryLevel: 78, brakeWear: 48, coolantLevel: 85, healthScore: 76, riskLevel: 'medium', lastUpdated: '2 min ago', mileage: 78450, location: 'Austin' },
  { id: 'VH-007', name: 'Fleet Delta 1', model: 'BMW X5', engineTemp: 96, tyrePressure: 35, batteryLevel: 89, brakeWear: 22, coolantLevel: 94, healthScore: 91, riskLevel: 'low', lastUpdated: '1 min ago', mileage: 34560, location: 'Miami' },
  { id: 'VH-008', name: 'Fleet Delta 2', model: 'Audi Q7', engineTemp: 101, tyrePressure: 29, batteryLevel: 71, brakeWear: 58, coolantLevel: 82, healthScore: 64, riskLevel: 'high', lastUpdated: '4 min ago', mileage: 98230, location: 'Chicago' },
  { id: 'VH-009', name: 'Fleet Epsilon 1', model: 'Mercedes GLE', engineTemp: 89, tyrePressure: 34, batteryLevel: 95, brakeWear: 12, coolantLevel: 98, healthScore: 97, riskLevel: 'low', lastUpdated: '1 min ago', mileage: 18920, location: 'NYC' },
  { id: 'VH-010', name: 'Fleet Epsilon 2', model: 'Volvo XC90', engineTemp: 93, tyrePressure: 32, batteryLevel: 84, brakeWear: 41, coolantLevel: 90, healthScore: 79, riskLevel: 'medium', lastUpdated: '3 min ago', mileage: 56780, location: 'Boston' },
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
  { id: 'ALT-001', vehicleId: 'VH-004', issue: 'Brake Pad Failure', probability: 87, timeToFailure: '48 hours', severity: 'critical', component: 'Braking System' },
  { id: 'ALT-002', vehicleId: 'VH-002', issue: 'Battery Degradation', probability: 72, timeToFailure: '5 days', severity: 'high', component: 'Power System' },
  { id: 'ALT-003', vehicleId: 'VH-008', issue: 'Coolant Leak Risk', probability: 65, timeToFailure: '7 days', severity: 'high', component: 'Cooling System' },
  { id: 'ALT-004', vehicleId: 'VH-006', issue: 'Tyre Wear Warning', probability: 54, timeToFailure: '14 days', severity: 'medium', component: 'Suspension' },
  { id: 'ALT-005', vehicleId: 'VH-010', issue: 'Oil Change Due', probability: 45, timeToFailure: '21 days', severity: 'low', component: 'Engine' },
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
  { id: 'AG-001', agentName: 'Master Orchestrator', agentType: 'master', action: 'Dispatched diagnosis task for VH-004', timestamp: '10:45:23', status: 'success' },
  { id: 'AG-002', agentName: 'Diagnosis Agent', agentType: 'worker', action: 'Analyzing brake wear patterns', timestamp: '10:45:25', status: 'pending' },
  { id: 'AG-003', agentName: 'Data Analysis Agent', agentType: 'worker', action: 'Processing telematics stream', timestamp: '10:45:20', status: 'success' },
  { id: 'AG-004', agentName: 'Customer Engagement', agentType: 'worker', action: 'Prepared alert for VH-004 owner', timestamp: '10:45:30', status: 'success' },
  { id: 'AG-005', agentName: 'UEBA Agent', agentType: 'worker', action: 'Monitoring agent behaviors', timestamp: '10:45:32', status: 'success' },
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
  { id: 'SL-001', date: '2024-01-15', time: '09:00 AM', available: true, recommended: false, centerName: 'AutoCare Central', distance: '2.3 mi', technicianCount: 3 },
  { id: 'SL-002', date: '2024-01-15', time: '10:30 AM', available: true, recommended: true, centerName: 'AutoCare Central', distance: '2.3 mi', technicianCount: 4 },
  { id: 'SL-003', date: '2024-01-15', time: '02:00 PM', available: true, recommended: false, centerName: 'QuickFix Motors', distance: '4.1 mi', technicianCount: 2 },
  { id: 'SL-004', date: '2024-01-16', time: '11:00 AM', available: true, recommended: false, centerName: 'AutoCare Central', distance: '2.3 mi', technicianCount: 3 },
  { id: 'SL-005', date: '2024-01-16', time: '03:30 PM', available: false, recommended: false, centerName: 'Elite Auto Service', distance: '5.8 mi', technicianCount: 5 },
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
  { id: 'RCA-001', defectType: 'Brake Pad Premature Wear', occurrences: 156, rootCause: 'Material composition variance in batch #2847', affectedModels: ['Model Y', 'Model 3'], correctiveAction: 'Replace brake compound supplier, recall affected batches', status: 'in-progress', trend: 'increasing' },
  { id: 'RCA-002', defectType: 'Battery Cell Degradation', occurrences: 89, rootCause: 'Thermal management software bug v2.3.1', affectedModels: ['Bolt EV', 'Model Y'], correctiveAction: 'OTA update for thermal algorithm, cell replacement program', status: 'open', trend: 'stable' },
  { id: 'RCA-003', defectType: 'Coolant Reservoir Crack', occurrences: 43, rootCause: 'Injection molding temperature deviation', affectedModels: ['F-150', 'RAM 1500'], correctiveAction: 'Quality gate added, supplier audit scheduled', status: 'resolved', trend: 'decreasing' },
  { id: 'RCA-004', defectType: 'Tyre Pressure Sensor Drift', occurrences: 67, rootCause: 'Calibration drift in humid conditions', affectedModels: ['Camry', 'Accord'], correctiveAction: 'Firmware update, waterproofing improvement', status: 'in-progress', trend: 'stable' },
];

// Chat messages for voice assistant
export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}

export const chatHistory: ChatMessage[] = [
  { id: 'CH-001', role: 'ai', content: 'Hello! I detected a brake pad wear risk in your vehicle VH-004 with an 87% failure probability in the next 48 hours. Would you like me to arrange a service appointment?', timestamp: '10:45:00' },
  { id: 'CH-002', role: 'user', content: 'Yes, please schedule it.', timestamp: '10:45:15' },
  { id: 'CH-003', role: 'ai', content: 'Great! I recommend 10:30 AM tomorrow at AutoCare Central, just 2.3 miles from your location. They have 4 certified technicians available. Should I confirm this slot?', timestamp: '10:45:18' },
  { id: 'CH-004', role: 'user', content: 'Yes, confirm it.', timestamp: '10:45:25' },
  { id: 'CH-005', role: 'ai', content: 'Your service is confirmed for tomorrow at 10:30 AM. I\'ll send you a reminder 1 hour before. Is there anything else I can help you with?', timestamp: '10:45:28' },
];
