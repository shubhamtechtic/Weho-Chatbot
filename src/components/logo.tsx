import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('text-foreground font-semibold tracking-wider', className)}>
      <div className="text-xs uppercase">City of</div>
      <div className="text-lg font-black uppercase leading-none">West Hollywood</div>
    </div>
  );
}
