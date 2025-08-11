import { SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8 md:justify-end">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="hidden md:hidden">
         <Logo />
      </div>
    </header>
  );
}
