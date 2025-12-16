import { useState } from 'react';
import { useRealtimeDefects } from '@/hooks/useRealtimeDefects';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  FileSearch, TrendingUp, TrendingDown, Minus, Send, Wrench, AlertCircle, 
  CheckCircle, Clock, Download, Mail, RefreshCw, Filter, BarChart3, 
  Target, Lightbulb, Zap, ArrowRight 
} from 'lucide-react';
import { vehicles, predictiveAlerts } from '@/data/mockData';
import { fleetMetricsHistory } from '@/data/extendedMockData';
import { exportFleetReport } from '@/utils/exportPdf';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Insights = () => {
  const { defects, isLoading, stats } = useRealtimeDefects();
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [manufacturingResponse, setManufacturingResponse] = useState<null | {
    status: string;
    ticketId: string;
    assignedTeam: string;
    estimatedResolution: string;
    priorityItems: string[];
    recommendations: string[];
  }>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');

  const trendData = [
    { month: 'Jul', brake: 12, battery: 8, coolant: 5 },
    { month: 'Aug', brake: 18, battery: 10, coolant: 7 },
    { month: 'Sep', brake: 22, battery: 9, coolant: 4 },
    { month: 'Oct', brake: 28, battery: 15, coolant: 6 },
    { month: 'Nov', brake: 35, battery: 18, coolant: 8 },
    { month: 'Dec', brake: 42, battery: 22, coolant: 9 },
  ];

  const maxValue = Math.max(...trendData.flatMap(d => [d.brake, d.battery, d.coolant]));

  const filteredItems = activeFilter === 'all' 
    ? defects 
    : defects.filter(item => item.status === activeFilter);

  const handleSendToManufacturing = async () => {
    setIsSending(true);
    
    // Simulate API call to manufacturing system
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response from manufacturing team
    setManufacturingResponse({
      status: 'Acknowledged',
      ticketId: `MFG-${Date.now().toString().slice(-6)}`,
      assignedTeam: 'Quality Assurance Division',
      estimatedResolution: '5-7 business days',
      priorityItems: [
        'Brake Pad Wear - Critical priority, affecting 156 vehicles',
        'Battery Degradation - High priority, supplier review initiated',
        'Coolant System Leaks - Medium priority, design review scheduled'
      ],
      recommendations: [
        'Implement enhanced incoming inspection for brake components',
        'Negotiate with alternate battery suppliers for improved cell quality',
        'Update coolant system design specifications for Q2 production',
        'Schedule recall campaign for affected brake pad batches',
        'Deploy IoT sensors for real-time quality monitoring'
      ]
    });
    
    setIsSending(false);
    setSendDialogOpen(true);
    
    toast({
      title: "Report Sent Successfully",
      description: "Manufacturing team has been notified of the RCA/CAPA findings.",
    });
  };

  const handleGenerateReport = () => {
    exportFleetReport(vehicles, predictiveAlerts, fleetMetricsHistory);
    toast({
      title: "Report Generated",
      description: "PDF report has been downloaded to your device.",
    });
  };

  const handleExportData = () => {
    exportFleetReport(vehicles, predictiveAlerts, fleetMetricsHistory);
    toast({
      title: "Data Exported",
      description: "PDF report downloaded successfully.",
    });
  };

  const handleRefreshAnalysis = () => {
    toast({
      title: "Analysis Refreshing",
      description: "Fetching latest telemetry data for analysis...",
    });
  };

  // AI-generated improvement suggestions
  const aiSuggestions = [
    {
      id: 1,
      title: 'Predictive Supplier Scoring',
      description: 'Implement ML-based supplier quality scoring to preempt component failures',
      impact: 'High',
      effort: 'Medium',
      icon: Target,
    },
    {
      id: 2,
      title: 'Automated Defect Clustering',
      description: 'Use clustering algorithms to identify hidden defect patterns across models',
      impact: 'High',
      effort: 'Low',
      icon: BarChart3,
    },
    {
      id: 3,
      title: 'Real-time Quality Gates',
      description: 'Deploy IoT sensors at production checkpoints for instant defect detection',
      impact: 'Critical',
      effort: 'High',
      icon: Zap,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">RCA/CAPA Insights</h1>
          <p className="text-muted-foreground">Root Cause Analysis & Corrective Actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleRefreshAnalysis}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={handleSendToManufacturing} disabled={isSending}>
            {isSending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {isSending ? 'Sending...' : 'Send to Manufacturing'}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 cursor-pointer hover:border-destructive/50 transition-colors" onClick={() => setActiveFilter('open')}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalDefects}</p>
              <p className="text-xs text-muted-foreground">Total Defects</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 cursor-pointer hover:border-warning/50 transition-colors" onClick={() => setActiveFilter('in-progress')}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 cursor-pointer hover:border-success/50 transition-colors" onClick={() => setActiveFilter('resolved')}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setActiveFilter('all')}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.capaActions}</p>
              <p className="text-xs text-muted-foreground">CAPA Actions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-2">Filter:</span>
        {(['all', 'open', 'in-progress', 'resolved'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              activeFilter === filter 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {filter === 'all' ? 'All' : filter === 'in-progress' ? 'In Progress' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Defect List & RCA Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-sm text-muted-foreground">No defects match the current filter criteria.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="glass-card p-6 hover:border-primary/30 transition-colors">
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
            ))
          )}
        </div>

        {/* Trend Charts & Insights */}
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

          {/* AI Suggestions */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" />
              AI Improvement Suggestions
            </h3>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded bg-primary/20">
                      <suggestion.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{suggestion.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-xs font-medium',
                          suggestion.impact === 'Critical' ? 'bg-destructive/20 text-destructive' :
                          suggestion.impact === 'High' ? 'bg-warning/20 text-warning' :
                          'bg-muted text-muted-foreground'
                        )}>
                          {suggestion.impact} Impact
                        </span>
                        <span className="text-xs text-muted-foreground">{suggestion.effort} Effort</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recurring Defects */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-primary" />
              Top Recurring Defects
            </h3>
            <div className="space-y-3">
              {defects.slice(0, 4).map((item, i) => (
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
            <Button className="w-full gap-2" variant="outline" onClick={handleGenerateReport}>
              <Download className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Manufacturing Response Dialog */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Manufacturing Response Received
            </DialogTitle>
            <DialogDescription>
              The manufacturing team has acknowledged your RCA/CAPA report.
            </DialogDescription>
          </DialogHeader>
          
          {manufacturingResponse && (
            <Tabs defaultValue="summary" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="priorities">Priorities</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground uppercase">Status</p>
                    <p className="text-lg font-semibold text-success">{manufacturingResponse.status}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground uppercase">Ticket ID</p>
                    <p className="text-lg font-mono font-semibold text-foreground">{manufacturingResponse.ticketId}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground uppercase">Assigned Team</p>
                    <p className="text-sm font-medium text-foreground">{manufacturingResponse.assignedTeam}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground uppercase">Est. Resolution</p>
                    <p className="text-sm font-medium text-foreground">{manufacturingResponse.estimatedResolution}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="priorities" className="mt-4">
                <div className="space-y-3">
                  {manufacturingResponse.priorityItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <span className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                        i === 0 ? 'bg-destructive/20 text-destructive' :
                        i === 1 ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      )}>
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="mt-4">
                <div className="space-y-2">
                  {manufacturingResponse.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
              Close
            </Button>
            <Button className="gap-2">
              <Mail className="w-4 h-4" />
              Email Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
