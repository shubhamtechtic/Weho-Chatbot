import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

type LogoProps = {
  className?: string;
};

export function Logoipsum({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2 text-foreground font-bold text-2xl', className)}>
      <ShieldCheck className="h-8 w-8 text-primary" />
      <span>Logoipsum</span>
    </div>
  );
}
