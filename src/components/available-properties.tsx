
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const properties = [
    {
        title: "Retail and Multifamily",
        type: "Mixed-Use",
        auctionDate: "2025-07-21T23:59:59",
        image: "https://placehold.co/600x400.png",
        location: "12,706 SF Retail Elizabeth, NJ 07201",
        features: [
            "Keighry Head location near it all",
            "Retail and multifamily value-add potential",
            "Starting bid $1,100,000"
        ]
    },
    {
        title: "Retail and Multifamily",
        type: "Mixed-Use",
        auctionDate: "2025-07-21T23:59:59",
        image: "https://placehold.co/600x400.png",
        location: "12,706 SF Retail Elizabeth, NJ 07201",
        features: [
            "Keighry Head location near it all",
            "Retail and multifamily value-add potential",
            "Starting bid $1,100,000"
        ]
    },
    {
        title: "Retail and Multifamily",
        type: "Mixed-Use",
        auctionDate: "2025-07-21T23:59:59",
        image: "https://placehold.co/600x400.png",
        location: "12,706 SF Retail Elizabeth, NJ 07201",
        features: [
            "Keighry Head location near it all",
            "Retail and multifamily value-add potential",
            "Starting bid $1,100,000"
        ]
    }
]

function Countdown({ date }: { date: string }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(date).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return (
        <span className="text-sm font-mono">
            {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
    );
}

function PropertyCard({ property }: { property: typeof properties[0] }) {
    return (
        <Card className="overflow-hidden shadow-lg bg-card">
            <div className="relative">
                <Image src={property.image} alt={property.title} width={600} height={400} className="w-full" data-ai-hint="commercial building" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider">AUCTION ON {new Date(property.auctionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <Countdown date={property.auctionDate} />
                </div>
            </div>
            <CardContent className="p-6 space-y-4">
                <div>
                    <h3 className="font-bold text-xl">{property.title}</h3>
                    <p className="text-muted-foreground">{property.type}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2 shrink-0" />
                    <span>{property.location}</span>
                </div>
                <ul className="space-y-2 text-sm list-disc pl-5 text-muted-foreground">
                    {property.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <Button variant="outline" className="w-full">View documents</Button>
            </CardContent>
        </Card>
    )
}

export function AvailableProperties() {
    return (
        <div className="py-16 md:py-24 lg:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold tracking-tight">View available properties</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore retail and commercial spaces currently available in West Hollywood, but don't go it alone. Before you sign a lease, talk to us first. Our advisors can help connect you with properties that best match your business goals, avoid common pitfalls, and provide insights to set you up for success.
                    </p>
                    <Button className="mt-8">See all</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((prop, index) => (
                        <PropertyCard key={index} property={prop} />
                    ))}
                </div>
            </div>
        </div>
    )
}
