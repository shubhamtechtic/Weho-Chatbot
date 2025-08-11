import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { resources } from '@/lib/data';
import { Mail, Phone } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary font-headline">Resource Directory</h1>
        <p className="mt-2 text-lg text-muted-foreground">Connect with key contacts in West Hollywood.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.name} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={resource.avatar} alt={resource.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{resource.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{resource.name}</CardTitle>
                  <CardDescription>{resource.title}</CardDescription>
                  <p className="text-sm text-muted-foreground">{resource.department}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" asChild className="flex-1">
                    <a href={`mailto:${resource.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Email
                    </a>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                    <a href={`tel:${resource.phone}`}>
                        <Phone className="mr-2 h-4 w-4" /> Call
                    </a>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
