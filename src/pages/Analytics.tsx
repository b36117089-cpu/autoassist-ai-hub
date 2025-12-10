import { fleetMetricsHistory, performanceScores, failurePredictions, costBreakdown } from '@/data/extendedMockData';
import { vehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Download,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const Analytics = () => {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const avgHealth = Math.round(vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length);
  const criticalCount = vehicles.filter(v => v.riskLevel === 'critical' || v.riskLevel === 'high').length;

  const pieColors = ['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--success))', 'hsl(var(--destructive))', 'hsl(var(--muted-foreground))'];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" />
            Fleet Analytics
          </h1>
          <p className="text-muted-foreground">Advanced insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" /> Last 6 Months
          </Button>
          <Button size="sm" className="bg-primary">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Fleet Cost</p>
              <p className="text-2xl font-bold text-foreground">${(totalCost / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-success mt-2">↓ 8% from last period</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Health Score</p>
              <p className="text-2xl font-bold text-foreground">{avgHealth}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-xs text-success mt-2">↑ 3 points improvement</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fleet Uptime</p>
              <p className="text-2xl font-bold text-foreground">94.2%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Target: 95%</p>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">At-Risk Vehicles</p>
              <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
          </div>
          <p className="text-xs text-destructive mt-2">Requires attention</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cost Trend */}
        <div className="col-span-12 lg:col-span-8">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Cost & Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={fleetMetricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Area type="monotone" dataKey="maintenanceCost" name="Maintenance" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                <Area type="monotone" dataKey="fuelCost" name="Fuel" stackId="1" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown Pie */}
        <div className="col-span-12 lg:col-span-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Cost Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="category"
                >
                  {costBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {costBreakdown.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[index] }} />
                    <span className="text-muted-foreground">{item.category}</span>
                  </div>
                  <span className="text-foreground font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Scores */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Performance vs Benchmark</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceScores} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Bar dataKey="score" name="Your Score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="benchmark" name="Benchmark" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Failure Predictions */}
        <div className="col-span-12 lg:col-span-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Failure Predictions</h3>
            <div className="space-y-3">
              {failurePredictions.map((prediction) => (
                <div key={prediction.component} className="p-3 rounded-lg bg-card/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{prediction.component}</span>
                    <Badge className={getImpactColor(prediction.impact)}>{prediction.impact}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-success via-warning to-destructive rounded-full transition-all"
                          style={{ width: `${prediction.probability}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-mono text-foreground">{prediction.probability}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Within {prediction.timeframe}</span>
                    <span>{prediction.vehiclesAffected} vehicles affected</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Score Trend */}
        <div className="col-span-12">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Fleet Health & Uptime Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={fleetMetricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgHealthScore" name="Avg Health Score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                <Line yAxisId="right" type="monotone" dataKey="uptimePercent" name="Uptime %" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: 'hsl(var(--success))' }} />
                <Line yAxisId="left" type="monotone" dataKey="incidentCount" name="Incidents" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ fill: 'hsl(var(--destructive))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
