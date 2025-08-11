'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { incentiveAdvisor, type IncentiveAdvisorOutput } from '@/ai/flows/incentive-advisor';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  businessType: z.string().min(2, { message: 'Business type is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  employeeCount: z.coerce.number().min(1, { message: 'Must have at least 1 employee.' }),
  revenue: z.coerce.number().min(0, { message: 'Revenue cannot be negative.' }),
  goals: z.string().min(10, { message: 'Please describe your goals in at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export function IncentiveAdvisorForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IncentiveAdvisorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
      location: 'West Hollywood',
      employeeCount: 10,
      revenue: 500000,
      goals: 'Expand our services and hire more local talent.',
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await incentiveAdvisor(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred while fetching recommendations. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Finding Incentives...</h2>
        <p className="text-muted-foreground">Our AI is analyzing your profile to find the best matches.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => setError(null)}>Try Again</Button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="w-6 h-6" /> AI-Powered Recommendations
                </CardTitle>
            </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Incentives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {result.recommendedIncentives.map((incentive, index) => (
                <li key={index} className="font-medium">{incentive}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" /> Advisor's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{result.summary}</p>
          </CardContent>
        </Card>
        <div className="text-center">
          <Button onClick={() => {
            setResult(null);
            form.reset();
          }}>Start Over</Button>
        </div>
      </div>
    );
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Business Type</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Retail, Restaurant, Tech" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., West Hollywood" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Number of Employees</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 25" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Annual Revenue (USD)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 750000" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Goals</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your business goals, e.g., expansion, sustainability, job creation..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Get Recommendations
        </Button>
      </form>
    </Form>
  );
}
