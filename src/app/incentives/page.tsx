import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { incentives } from '@/lib/data';
import type { Incentive } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Arts & Culture', 'Sustainability', 'Small Business', 'Community'];

function IncentiveCard({ incentive }: { incentive: Incentive }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{incentive.title}</CardTitle>
        <CardDescription>{incentive.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="font-semibold mb-2">Eligibility:</h4>
        <div className="flex flex-wrap gap-2">
          {incentive.eligibility.map((item) => (
            <Badge key={item} variant="secondary">{item}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={incentive.link}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function IncentivesPage() {
  return (
    <div className="space-y-8 container mx-auto px-4 md:px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Incentives Navigator</h1>
        <p className="mt-2 text-lg text-muted-foreground">Discover the wide range of incentives for West Hollywood businesses.</p>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="All">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {incentives.map((incentive) => (
              <IncentiveCard key={incentive.title} incentive={incentive} />
            ))}
          </div>
        </TabsContent>
        {categories.slice(1).map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {incentives
                .filter((i) => i.category === category)
                .map((incentive) => (
                  <IncentiveCard key={incentive.title} incentive={incentive} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
