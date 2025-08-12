import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  "Gather your business information",
  "Complete the online form",
  "Submit required documents",
  "Pay the application fee",
];

export default function PreApplicationPage() {
  return (
    <div className="space-y-8 container mx-auto px-4 md:px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Business License Pre-Application</h1>
        <p className="mt-2 text-lg text-muted-foreground">Everything you need to know before you apply.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">Get Started in 4 Easy Steps</CardTitle>
              <CardDescription>Follow this guide to ensure a smooth application process.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <ul className="space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold">Step {index + 1}</h3>
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
                <Link href="#">
                  Start Pre-Application Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </div>
          <div className="relative hidden md:block">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Person filling out a form"
              fill
              className="object-cover"
              data-ai-hint="document business"
            />
          </div>
        </div>
      </Card>

    </div>
  );
}
