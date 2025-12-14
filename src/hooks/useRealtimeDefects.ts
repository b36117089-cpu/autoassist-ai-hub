import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { rcaItems, RCAItem } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export interface Defect {
  id: string;
  defect_code: string;
  description: string;
  vehicle_id: string;
  component: string;
  severity: string;
  status: string;
  frequency: number;
  root_cause: string | null;
  corrective_action: string | null;
  detected_at: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

const mapDefectToRcaItem = (defect: Defect): RCAItem => ({
  id: defect.id,
  defectType: defect.description,
  occurrences: defect.frequency,
  affectedModels: [defect.vehicle_id],
  rootCause: defect.root_cause || 'Under investigation',
  correctiveAction: defect.corrective_action || 'Pending analysis',
  status: defect.status as 'open' | 'in-progress' | 'resolved',
  trend: defect.severity === 'critical' ? 'increasing' : defect.severity === 'low' ? 'decreasing' : 'stable',
});

export const useRealtimeDefects = () => {
  const [defects, setDefects] = useState<RCAItem[]>(rcaItems);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDefects: 355,
    inProgress: 2,
    resolved: 1,
    capaActions: 8,
  });

  // Fetch initial defects from database
  useEffect(() => {
    const fetchDefects = async () => {
      try {
        const { data, error } = await supabase
          .from('defects')
          .select('*')
          .order('detected_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedDefects = data.map(mapDefectToRcaItem);
          setDefects([...mappedDefects, ...rcaItems]);
          
          // Update stats
          const openCount = data.filter(d => d.status === 'open').length;
          const inProgressCount = data.filter(d => d.status === 'in-progress').length;
          const resolvedCount = data.filter(d => d.status === 'resolved').length;
          
          setStats({
            totalDefects: 355 + data.reduce((sum, d) => sum + d.frequency, 0),
            inProgress: 2 + inProgressCount,
            resolved: 1 + resolvedCount,
            capaActions: 8 + data.filter(d => d.corrective_action).length,
          });
        }
      } catch (error) {
        console.error('Error fetching defects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDefects();
  }, []);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('defects-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'defects',
        },
        (payload) => {
          console.log('Realtime defect update:', payload);

          if (payload.eventType === 'INSERT') {
            const newDefect = mapDefectToRcaItem(payload.new as Defect);
            setDefects(prev => [newDefect, ...prev]);
            
            setStats(prev => ({
              ...prev,
              totalDefects: prev.totalDefects + (payload.new as Defect).frequency,
              inProgress: (payload.new as Defect).status === 'in-progress' ? prev.inProgress + 1 : prev.inProgress,
            }));

            toast({
              title: "New Defect Detected",
              description: `${(payload.new as Defect).description} - Vehicle ${(payload.new as Defect).vehicle_id}`,
              variant: "destructive",
            });
          }

          if (payload.eventType === 'UPDATE') {
            setDefects(prev =>
              prev.map(d =>
                d.id === (payload.new as Defect).id
                  ? mapDefectToRcaItem(payload.new as Defect)
                  : d
              )
            );

            toast({
              title: "Defect Updated",
              description: `Status changed to ${(payload.new as Defect).status}`,
            });
          }

          if (payload.eventType === 'DELETE') {
            setDefects(prev => prev.filter(d => d.id !== (payload.old as Defect).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { defects, isLoading, stats };
};
