import { ChatMessage } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatTranscriptProps {
  messages: ChatMessage[];
}

export const ChatTranscript = ({ messages }: ChatTranscriptProps) => {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn(
            'flex gap-3 animate-fade-in',
            message.role === 'user' && 'flex-row-reverse'
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
            message.role === 'ai' ? 'bg-primary/20' : 'bg-secondary'
          )}>
            {message.role === 'ai' ? (
              <Bot className="w-4 h-4 text-primary" />
            ) : (
              <User className="w-4 h-4 text-foreground" />
            )}
          </div>
          <div className={cn(
            'flex-1 max-w-[80%]',
            message.role === 'user' && 'text-right'
          )}>
            <div className={cn(
              'inline-block p-3 rounded-2xl text-sm',
              message.role === 'ai' 
                ? 'bg-muted text-foreground rounded-tl-sm' 
                : 'bg-primary text-primary-foreground rounded-tr-sm'
            )}>
              {message.content}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
