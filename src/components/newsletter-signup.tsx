
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export function NewsletterSignUp() {
  return (
    <div className="bg-gray-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Newsletter opt-in title</h2>
        <p className="mt-4 text-lg text-gray-300">
          Get industry insights and updates straight to your inbox.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="email@example.com"
            className="flex-grow bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-primary focus:border-primary"
          />
          <Button type="submit" variant="secondary" size="lg">
            <ArrowRight className="h-5 w-5" />
            <span className="sr-only">Subscribe</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
