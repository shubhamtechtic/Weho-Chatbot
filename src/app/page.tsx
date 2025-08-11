import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Gift, Search, BrainCircuit, BookUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Pre-Application",
    description: "Start your business license pre-application.",
    href: "/pre-application",
    icon: FileText,
  },
  {
    title: "Incentives Navigator",
    description: "Explore available business incentives.",
    href: "/incentives",
    icon: Gift,
  },
  {
    title: "Grant Finder",
    description: "Find grants that match your business needs.",
    href: "/grant-finder",
    icon: Search,
  },
  {
    title: "Incentive Advisor",
    description: "Get AI-powered incentive recommendations.",
    href: "/incentive-advisor",
    icon: BrainCircuit,
  },
    {
    title: "Resource Directory",
    description: "Access key contacts and resources.",
    href: "/resources",
    icon: BookUser,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <section className="flex flex-col lg:flex-row items-center gap-8 p-4 md:p-8 bg-card rounded-lg shadow-sm">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
            Welcome to the WeHo Business Navigator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your comprehensive guide to starting and growing your business in West Hollywood. Let's navigate the path to your success together.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="/pre-application">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="West Hollywood street view"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl object-cover"
            data-ai-hint="cityscape california"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">Explore Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href={feature.href}>
                    Go to {feature.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
