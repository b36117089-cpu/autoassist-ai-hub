import { cn } from '@/lib/utils';

interface WaveformProps {
  isActive: boolean;
}

export const Waveform = ({ isActive }: WaveformProps) => {
  const bars = 32;
  
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1 bg-primary rounded-full transition-all duration-150',
            isActive ? 'waveform-bar' : 'h-1'
          )}
          style={{
            animationDelay: `${i * 30}ms`,
            height: isActive ? `${Math.random() * 50 + 10}px` : '4px',
          }}
        />
      ))}
    </div>
  );
};
