

'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IncentivesPage from "./incentives/page";
import GrantFinderPage from "./grant-finder/page";
import PreApplicationPage from "./pre-application/page";
import IncentiveAdvisorPage from "./incentive-advisor/page";
import ResourcesPage from "./resources/page";
import FindYourDistrictPage from "./find-your-district/page";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Logoipsum } from "@/components/logoipsum";
import { AvailableProperties } from "@/components/available-properties";


const suggestedQuestions = [
    { text: "How do I get a business license?", href: "/#pre-application" },
    { text: "Are there any incentives?", href: "/#incentives" },
    { text: "What district best fits my business?", href: "/#find-your-district" },
]

const stats = [
    { value: '1.9 mi²', description: 'walkable and transit-rich city' },
    { value: '33,000', description: 'residents with global reach and diverse talent' },
    { value: '4 M+', description: 'visitors yearly fuel retail and nightlife' },
    { value: '$1.73 B', description: 'visitor spend drives the local economy' },
];

const testimonials = [
    {
        headline: 'Headline',
        text: 'Vestibulum nam nunc bibendum mauris. Id vel facilisis blandit leo viverra ultrices. Vitae dignissim.',
        author: {
            name: 'Name Surname',
            title: 'JOB TITLE',
        }
    },
    {
        headline: 'Headline',
        text: 'Vestibulum nam nunc bibendum mauris. Id vel facilisis blandit leo viverra ultrices. Vitae dignissim.',
        author: {
            name: 'Name Surname',
            title: 'JOB TITLE',
        }
    },
    {
        headline: 'Headline',
        text: 'Vestibulum nam nunc bibendum mauris. Id vel facilisis blandit leo viverra ultrices. Vitae dignissim.',
        author: {
            name: 'Name Surname',
            title: 'JOB TITLE',
        }
    }
]

const resources = [
    {
        title: "Interactive data tools",
        description: "market profiles, labor stats, consumer spending"
    },
    {
        title: "Chamber of Commerce",
        description: "networking & advocacy"
    },
    {
        title: "Business grants",
        description: "ordinances and green-business grants"
    },
    {
        title: "On-call Business Concierge",
        description: "business@weho.org | 323-848-6429",
        cta: "Contact us"
    }
]

export default function Home() {
    const router = useRouter();
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center flex-1 py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase">
                      Culture comes first
                  </h1>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase">
                      West Hollywood
                  </h2>
                  <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
                      The creative soul of LA is open for business. Launch, grow, and thrive at the epicenter of it all.
                  </p>
              </div>
              <Card className="mt-12 max-w-2xl mx-auto text-left p-6 bg-card/50">
                  <CardContent className="p-0">
                      <p className="font-semibold mb-4">Ask a question</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                          {suggestedQuestions.map((q) => (
                              <Button key={q.text} variant="secondary" className="justify-start sm:justify-center flex-1" asChild>
                                <Link href={q.href}>{q.text}</Link>
                              </Button>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
      <div className="bg-gray-800 text-white py-16 px-4 md:px-6 text-center">
        <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight">Looking for a pop-up permit?</h2>
            <p className="mt-4 text-lg text-gray-300">
                Turn the city into an open-air market. Apply once, and we'll handle street closures, security coordination, and promotional boosts.
            </p>
            <Button asChild className="mt-8" variant="secondary">
                <Link href="#">Apply</Link>
            </Button>
        </div>
      </div>
       <div className="py-16 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {stats.map((stat) => (
                    <Card key={stat.value} className="p-6">
                        <CardContent className="p-0">
                            <p className="text-4xl font-bold">{stat.value}</p>
                            <p className="text-muted-foreground mt-2">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-16 text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight">Small city, big impact</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    West Hollywood champions a vibrant creative economy, world-leading arts programs, and inclusive policies that welcome every entrepreneur.
                </p>
                <Button variant="outline" className="mt-8">Learn More</Button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 text-white">
        <div className="bg-gray-800 p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight">Start a business in WeHo</h2>
            <p className="mt-4 text-lg text-gray-300">
                From permits to ribbon-cutting, get a step-by-step startup playbook, fee waivers for green businesses, and free talent recruiting through the WeHo Employee Service & Training Office.
            </p>
            <Button asChild className="mt-8" variant="secondary">
                <Link href="#">Learn More</Link>
            </Button>
        </div>
        <div className="bg-gray-700 p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight">Expand your business in WeHo</h2>
            <p className="mt-4 text-lg text-gray-300">
                Ready to scale? We have tax-credit programs for long-term leases, fast-track tenant-improvement permits, and district-level marketing via local BIDs.
            </p>
            <Button asChild className="mt-8" variant="secondary">
                <Link href="#">Learn More</Link>
            </Button>
        </div>
      </div>

      <div className="py-16 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">STARTED IN WEHO</p>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon"><ArrowLeft /></Button>
                            <Button variant="outline" size="icon"><ArrowRight /></Button>
                        </div>
                    </div>
                    <Logoipsum className="h-10 w-auto mb-6" />
                    <p className="text-2xl font-medium leading-relaxed mb-6">
                        We opened as a 1,100-square-foot coffee shop. Thirty years later The Abbey is a 16,000-square-foot global icon, because WeHo believes in bold ideas.
                    </p>
                    <p className="font-semibold">— David Cooley, Founder, The Abbey Food & Bar</p>
                </div>
                <div>
                    <Card className="overflow-hidden">
                        <div className="relative aspect-square w-full">
                            <Image src="https://placehold.co/600x600.png" alt="The Abbey Food & Bar" layout="fill" objectFit="cover" data-ai-hint="restaurant interior" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
      </div>
      
      <div id="find-your-district">
        <FindYourDistrictPage />
      </div>

      <div className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {resources.map((resource, index) => (
                    <Card key={index} className="p-6 text-center flex flex-col justify-between items-center h-full shadow-lg">
                        <CardContent className="p-0 flex flex-col items-center">
                           <div className="flex-grow flex flex-col justify-center items-center">
                             <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                             <p className="text-muted-foreground mb-4">{resource.description}</p>
                           </div>
                           {resource.cta && (
                            <Button variant="outline" asChild>
                                <Link href="#">{resource.cta}</Link>
                            </Button>
                           )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>

      <AvailableProperties />

      <div className="py-16 md:py-24 lg:py-32 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-12">Awards</h2>
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="h-40 bg-secondary/50"></Card>
                <Card className="h-40 bg-secondary/50"></Card>
                <Card className="h-40 bg-secondary/50"></Card>
                <Card className="h-40 bg-secondary/50"></Card>
            </div>
        </div>
      </div>
      
      <div className="py-16 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight">News</h2>
                <div className="flex gap-4">
                    <Button variant="outline" size="icon"><ArrowLeft /></Button>
                    <Button variant="outline" size="icon"><ArrowRight /></Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="p-6">
                        <CardContent className="p-0 flex flex-col h-full">
                           <div className="flex-grow">
                             <h3 className="text-xl font-bold mb-2">{testimonial.headline}</h3>
                             <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                           </div>
                           <div>
                            <Logoipsum className="h-8 w-auto mb-4" />
                            <p className="font-semibold">{testimonial.author.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.author.title}</p>
                           </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>

      <div id="grant-finder">
        <GrantFinderPage />
      </div>
      <div id="pre-application">
        <PreApplicationPage />
      </div>
      <div id="incentive-advisor">
        <IncentiveAdvisorPage />
      </div>
      <div id="incentives">
        <IncentivesPage />
      </div>
      <div id="resources">
        <ResourcesPage />
      </div>
    </>
  );
}
