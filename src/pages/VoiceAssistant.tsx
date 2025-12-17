import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatHistory } from '@/data/mockData';
import { Waveform } from '@/components/voice/Waveform';
import { ChatTranscript } from '@/components/voice/ChatTranscript';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Calendar, Info, Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">AutoAssist Voice Agent</h1>
        <p className="text-muted-foreground">AI-powered predictive maintenance assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Interface */}
        <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[500px]">
          {/* Mic Button */}
          <div className="relative mb-8">
            <button
              onClick={() => setIsListening(!isListening)}
              className={cn(
                'w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300',
                isListening 
                  ? 'bg-primary animate-pulse-glow' 
                  : 'bg-secondary hover:bg-secondary/80'
              )}
            >
              {isListening ? (
                <Mic className="w-12 h-12 text-primary-foreground" />
              ) : (
                <MicOff className="w-12 h-12 text-muted-foreground" />
              )}
            </button>
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" />
                <div className="absolute inset-[-10px] rounded-full border border-primary/30 animate-pulse" />
              </>
            )}
          </div>

          {/* Waveform */}
          <div className="w-full mb-8">
            <Waveform isActive={isListening} />
          </div>

          <p className={cn(
            'text-sm font-medium transition-colors',
            isListening ? 'text-primary' : 'text-muted-foreground'
          )}>
            {isListening ? 'Listening...' : 'Tap to speak'}
          </p>

          {/* Predicted Issue Summary */}
          <div className="w-full mt-8 glass-card p-4 bg-warning/5 border-warning/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground">Predicted Issue Detected</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Brake pad wear in VH-003 with 87% failure probability within 48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 w-full">
            <Button 
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
              onClick={() => navigate('/scheduling?vehicleId=VH-003')}
            >
              <Calendar className="w-4 h-4" />
              Schedule Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => setShowInfoDialog(true)}
            >
              <Info className="w-4 h-4" />
              More Info
            </Button>
            <Button variant="outline" className="gap-2">
              <Bell className="w-4 h-4" />
            </Button>
          </div>

          {/* Info Dialog */}
          <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Predicted Issue Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <h4 className="font-medium text-foreground mb-2">Brake Pad Wear - VH-003</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Failure Probability:</strong> 87%</p>
                    <p><strong>Time Frame:</strong> Within 48 hours</p>
                    <p><strong>Component:</strong> Front brake pads</p>
                    <p><strong>Current Wear:</strong> 92% worn</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>Recommended Action:</strong> Immediate replacement of front brake pads to prevent safety hazard.</p>
                  <p><strong>Estimated Cost:</strong> ₹2,500 - ₹4,000</p>
                  <p><strong>Service Duration:</strong> 45 minutes</p>
                </div>
                <Button className="w-full" onClick={() => { setShowInfoDialog(false); navigate('/scheduling?vehicleId=VH-003'); }}>
                  Schedule Service Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Chat Transcript */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Conversation</h2>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          
          <ChatTranscript messages={chatHistory} />

          {/* Booking Confirmed */}
          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/30">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <div>
                <h3 className="font-medium text-foreground">Booking Confirmed</h3>
                <p className="text-sm text-muted-foreground">
                  Tomorrow at 10:30 AM • AutoCare Central
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
