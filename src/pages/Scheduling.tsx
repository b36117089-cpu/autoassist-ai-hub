import { useState } from 'react';
import { serviceSlots, vehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Star, Check, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const serviceCenters = [
  { id: 'SC-001', name: 'AutoCare Central', distance: '2.3 km', rating: 4.8, available: 4 },
  { id: 'SC-002', name: 'QuickFix Motors', distance: '4.1 km', rating: 4.5, available: 2 },
  { id: 'SC-003', name: 'Elite Auto Service', distance: '5.8 km', rating: 4.9, available: 5 },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = [2024, 2025, 2026];

const brands = ['All Brands', 'Hero', 'Mahindra'];

const Scheduling = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>('SL-002');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(0); // January
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Generate mock availability heatmap
  const getAvailability = (day: number, hour: number) => {
    const seed = (day * 10 + hour) % 5;
    return seed > 2 ? 'high' : seed > 0 ? 'medium' : 'low';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Autonomic Scheduling</h1>
        <p className="text-muted-foreground">AI-optimized service appointment booking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Available Slots
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Brand Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-[140px] h-8 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month/Year Navigation */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Select value={currentMonth.toString()} onValueChange={(v) => setCurrentMonth(parseInt(v))}>
                  <SelectTrigger className="w-[120px] h-8 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {months.map((month, idx) => (
                      <SelectItem key={month} value={idx.toString()}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={currentYear.toString()} onValueChange={(v) => setCurrentYear(parseInt(v))}>
                  <SelectTrigger className="w-[90px] h-8 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Slot Grid */}
          <div className="space-y-4">
            {serviceSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => slot.available && setSelectedSlot(slot.id)}
                className={cn(
                  'p-4 rounded-lg border cursor-pointer transition-all duration-200',
                  !slot.available && 'opacity-50 cursor-not-allowed',
                  selectedSlot === slot.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-muted/30 border-border hover:border-primary/50',
                  slot.recommended && selectedSlot !== slot.id && 'border-success/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      selectedSlot === slot.id ? 'bg-primary' : 'bg-secondary'
                    )}>
                      <Clock className={cn(
                        'w-5 h-5',
                        selectedSlot === slot.id ? 'text-primary-foreground' : 'text-muted-foreground'
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{slot.time}</span>
                        <span className="text-sm text-muted-foreground">• {slot.date}</span>
                        {slot.recommended && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-success/20 text-success rounded-full">
                            AI Recommended
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {slot.centerName} ({slot.distance})
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {slot.technicianCount} technicians
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedSlot === slot.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Service Centers */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Nearby Centers
            </h3>
            <div className="space-y-3">
              {serviceCenters.map((center) => (
                <div key={center.id} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground text-sm">{center.name}</span>
                    <span className="text-xs text-muted-foreground">{center.distance}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning" />
                      {center.rating}
                    </span>
                    <span>{center.available} slots today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technician Heatmap */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-foreground mb-4">Availability Heatmap</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-8 gap-1 text-xs">
                <div></div>
                {days.map((day) => (
                  <div key={day} className="text-center text-muted-foreground">{day}</div>
                ))}
              </div>
              {hours.slice(0, 6).map((hour, hi) => (
                <div key={hour} className="grid grid-cols-8 gap-1">
                  <div className="text-xs text-muted-foreground">{hour}</div>
                  {days.map((_, di) => {
                    const avail = getAvailability(di, hi);
                    return (
                      <div
                        key={di}
                        className={cn(
                          'h-6 rounded',
                          avail === 'high' && 'bg-success/60',
                          avail === 'medium' && 'bg-warning/60',
                          avail === 'low' && 'bg-destructive/40'
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-success/60 rounded" /> High</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-warning/60 rounded" /> Medium</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-destructive/40 rounded" /> Low</span>
            </div>
          </div>

          {/* Confirm Button */}
          <Button 
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            onClick={() => setShowConfirmation(true)}
            disabled={!selectedSlot}
          >
            <Check className="w-4 h-4" />
            Confirm Booking
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-8 max-w-md w-full mx-4 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your service appointment has been scheduled for tomorrow at 10:30 AM at AutoCare Central.
              </p>
              <Button onClick={() => setShowConfirmation(false)} className="w-full">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;
