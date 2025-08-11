
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { districts } from '@/lib/districts';
import type { District } from '@/lib/types';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function DistrictCard({ district }: { district: District }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="p-0">
            <div className="relative h-48 w-full">
                <Image
                    src={district.image}
                    alt={district.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="city district"
                />
            </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle>{district.name}</CardTitle>
        <p className="text-muted-foreground mt-2">{district.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={district.link}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function FindYourDistrictPage() {
  return (
    <div className="space-y-8 container mx-auto px-4 md:px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Find Your District</h1>
        <p className="mt-2 text-lg text-muted-foreground">Discover the perfect neighborhood for your business.</p>
      </div>

        <div className="max-w-xl mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search by keyword, industry, or vibe..." className="pl-10" />
            </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {districts.map((district) => (
          <DistrictCard key={district.name} district={district} />
        ))}
      </div>
    </div>
  );
}
