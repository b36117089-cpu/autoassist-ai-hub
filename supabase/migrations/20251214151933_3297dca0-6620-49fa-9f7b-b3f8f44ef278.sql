-- Create defects table for RCA/CAPA tracking
CREATE TABLE public.defects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  defect_code TEXT NOT NULL,
  description TEXT NOT NULL,
  vehicle_id TEXT NOT NULL,
  component TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  frequency INTEGER NOT NULL DEFAULT 1,
  root_cause TEXT,
  corrective_action TEXT,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.defects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (fleet monitoring is typically org-wide)
CREATE POLICY "Defects are viewable by everyone" 
ON public.defects 
FOR SELECT 
USING (true);

-- Create policy for insert
CREATE POLICY "Anyone can insert defects" 
ON public.defects 
FOR INSERT 
WITH CHECK (true);

-- Create policy for update
CREATE POLICY "Anyone can update defects" 
ON public.defects 
FOR UPDATE 
USING (true);

-- Enable realtime for defects table
ALTER PUBLICATION supabase_realtime ADD TABLE public.defects;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_defects_updated_at
BEFORE UPDATE ON public.defects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();