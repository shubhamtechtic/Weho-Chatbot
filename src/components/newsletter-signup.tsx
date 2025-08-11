
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function NewsletterSignUp() {
    return (
        <div className="bg-gray-800 text-white py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
                <h2 className="text-4xl font-bold tracking-tight">Newsletter opt-in title</h2>
                <p className="mt-4 text-lg text-gray-300">
                    Get industry insights and updates straight to your inbox.
                </p>
                <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <Input 
                        type="email" 
                        placeholder="email@example.com" 
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
                        aria-label="Email for newsletter"
                    />
                    <Button type="submit" variant="secondary" size="icon" aria-label="Subscribe">
                        <ArrowRight />
                    </Button>
                </form>
            </div>
        </div>
    )
}
