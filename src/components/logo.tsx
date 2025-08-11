import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Building2 className="h-6 w-6 text-primary" />
      {showText && (
        <h1 className="text-lg font-bold text-primary font-headline whitespace-nowrap">
          WeHo Navigator
        </h1>
      )}
    </div>
  );
}
