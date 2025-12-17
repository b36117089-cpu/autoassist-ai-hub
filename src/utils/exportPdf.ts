import jsPDF from 'jspdf';
import { Vehicle, PredictiveAlert } from '@/data/mockData';
import { MaintenanceRecord, FleetMetrics } from '@/data/extendedMockData';

export const exportFleetReport = (
  vehicles: Vehicle[],
  alerts: PredictiveAlert[],
  metrics: FleetMetrics[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(30, 64, 175);
  doc.text('Fleet Management Report', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth / 2, 28, { align: 'center' });
  
  // Fleet Summary Section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Fleet Summary', 14, 45);
  
  doc.setFontSize(10);
  doc.setTextColor(60);
  const avgHealth = Math.round(vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length);
  const criticalVehicles = vehicles.filter(v => v.riskLevel === 'critical' || v.riskLevel === 'high').length;
  
  doc.text(`Total Vehicles: ${vehicles.length}`, 14, 55);
  doc.text(`Average Health Score: ${avgHealth}%`, 14, 62);
  doc.text(`At-Risk Vehicles: ${criticalVehicles}`, 14, 69);
  doc.text(`Active Alerts: ${alerts.length}`, 14, 76);
  
  // Vehicle List
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Vehicle Status', 14, 95);
  
  let yPos = 105;
  doc.setFontSize(9);
  
  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(14, yPos - 5, pageWidth - 28, 8, 'F');
  doc.setTextColor(60);
  doc.text('Vehicle', 16, yPos);
  doc.text('Model', 50, yPos);
  doc.text('Health', 100, yPos);
  doc.text('Risk', 130, yPos);
  doc.text('Location', 160, yPos);
  
  yPos += 10;
  
  vehicles.slice(0, 10).forEach((vehicle) => {
    doc.setTextColor(0);
    doc.text(vehicle.name, 16, yPos);
    doc.text(vehicle.model.substring(0, 15), 50, yPos);
    doc.text(`${vehicle.healthScore}%`, 100, yPos);
    
    // Color code risk
    switch (vehicle.riskLevel) {
      case 'critical':
        doc.setTextColor(220, 38, 38);
        break;
      case 'high':
        doc.setTextColor(234, 179, 8);
        break;
      case 'medium':
        doc.setTextColor(249, 115, 22);
        break;
      default:
        doc.setTextColor(34, 197, 94);
    }
    doc.text(vehicle.riskLevel.toUpperCase(), 130, yPos);
    
    doc.setTextColor(0);
    doc.text(vehicle.location, 160, yPos);
    
    yPos += 7;
  });
  
  // Alerts Section
  doc.addPage();
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Active Alerts', 14, 20);
  
  yPos = 30;
  doc.setFontSize(9);
  
  alerts.forEach((alert) => {
    doc.setTextColor(0);
    doc.text(`• ${alert.issue}`, 16, yPos);
    doc.setTextColor(100);
    doc.text(`Vehicle: ${alert.vehicleId} | Probability: ${alert.probability}% | Time to Failure: ${alert.timeToFailure}`, 20, yPos + 5);
    yPos += 15;
  });
  
  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    doc.text('AutoAssist - Predictive Car Maintenance Dashboard', 14, doc.internal.pageSize.getHeight() - 10);
  }
  
  doc.save('fleet-report.pdf');
};

export const exportVehicleReport = (
  vehicle: Vehicle,
  alerts: PredictiveAlert[],
  maintenance: MaintenanceRecord[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175);
  doc.text(`Vehicle Report: ${vehicle.name}`, pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`${vehicle.model} • ${vehicle.id}`, pageWidth / 2, 28, { align: 'center' });
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 35, { align: 'center' });
  
  // Health Overview
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Health Overview', 14, 50);
  
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Health Score: ${vehicle.healthScore}%`, 14, 60);
  doc.text(`Risk Level: ${vehicle.riskLevel.toUpperCase()}`, 14, 67);
  doc.text(`Mileage: ${vehicle.mileage.toLocaleString()} miles`, 14, 74);
  doc.text(`Location: ${vehicle.location}`, 14, 81);
  
  // Telemetry
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Current Telemetry', 14, 100);
  
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text(`Engine Temperature: ${vehicle.engineTemp}°C`, 14, 110);
  doc.text(`Battery Level: ${vehicle.batteryLevel}%`, 14, 117);
  doc.text(`Brake Wear: ${vehicle.brakeWear}%`, 14, 124);
  doc.text(`Tyre Pressure: ${vehicle.tyrePressure} psi`, 14, 131);
  doc.text(`Coolant Level: ${vehicle.coolantLevel}%`, 14, 138);
  
  // Alerts
  const vehicleAlerts = alerts.filter(a => a.vehicleId === vehicle.id);
  if (vehicleAlerts.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Active Alerts', 14, 160);
    
    let yPos = 170;
    vehicleAlerts.forEach((alert) => {
      doc.setFontSize(10);
      doc.setTextColor(220, 38, 38);
      doc.text(`⚠ ${alert.issue} (${alert.probability}% probability)`, 14, yPos);
      doc.setTextColor(100);
      doc.text(`Expected within ${alert.timeToFailure}`, 18, yPos + 6);
      yPos += 15;
    });
  }
  
  doc.save(`vehicle-report-${vehicle.id}.pdf`);
};
