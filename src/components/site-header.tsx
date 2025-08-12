
'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { ChevronDown, Menu, ArrowRight } from 'lucide-react';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
    { 
        label: 'Why West Hollywood', 
        href: '#',
        items: [
            { label: 'Overview', href: '/#incentives' },
            { label: 'Testimonials', href: '#' },
            { label: 'Find Your District', href: '/#find-your-district' },
        ]
    },
    { 
        label: 'Starting in WeHo',
        href: '#',
        items: [
            { label: 'Grant Finder', href: '/#grant-finder' },
            { label: 'Pre-Application', href: '/#pre-application' },
            { label: 'AI Advisor', href: '/#incentive-advisor' },
        ]
    },
    { 
        label: 'For Existing Businesses', 
        href: '#',
        items: [
             { label: 'Incentives', href: '/#incentives' },
             { label: 'Resource Directory', href: '/#resources' },
        ]
    },
];

const allLinks = [
    ...navLinks.flatMap(l => l.items ? [{label: l.label, href: l.href, isTitle: true}, ...l.items] : [{...l, isTitle: false}]),
    { label: 'Dashboard', href: '/', isTitle: false},
    { label: 'Pre-Application', href: '/#pre-application', isTitle: false},
    { label: 'Incentives', href: '/#incentives', isTitle: false },
    { label: 'Grant Finder', href: '/#grant-finder', isTitle: false },
    { label: 'AI Advisor', href: '/#incentive-advisor', isTitle: false },
    { label: 'Resources', href: '/#resources', isTitle: false },
    { label: 'Find Your District', href: '/#find-your-district', isTitle: false },
].filter((obj, index, self) => index === self.findIndex(o => o.label === obj.label && o.href === obj.href));


export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="bg-primary text-primary-foreground text-center text-sm p-2">
        <Link href="#" className="hover:underline">
            Looking for a pop-up permit? Apply here <ArrowRight className="inline h-4 w-4" />
        </Link>
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
             {navLinks.map((link) => (
                <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1">
                            {link.label} <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {link.items?.map((item) => (
                            <DropdownMenuItem key={item.label} asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
             ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link href="#">Ask a question</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Menu</SheetTitle>
                  <SheetDescription>
                    Main navigation menu for mobile devices.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 p-6">
                <Link href="/">
                    <Logo />
                </Link>
                  <nav className="flex flex-col gap-2 mt-4">
                    {allLinks.map((link) => (
                         <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "font-medium hover:text-primary",
                                link.isTitle ? "text-lg text-muted-foreground mt-2" : "text-md",
                                ((pathname === '/' && link.href.startsWith('/#')) || pathname === link.href) && !link.isTitle && "text-primary"
                            )}
                         >
                            {link.label}
                         </Link>
                    ))}
                  </nav>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="#">Ask a question</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
