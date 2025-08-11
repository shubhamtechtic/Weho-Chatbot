// incentive-advisor.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized incentive recommendations to business owners.
 *
 * - IncentiveAdvisorInput - The input type for the incentiveAdvisor function.
 * - IncentiveAdvisorOutput - The return type for the incentiveAdvisor function.
 * - incentiveAdvisor - A function that takes IncentiveAdvisorInput and returns IncentiveAdvisorOutput with personalized incentive recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncentiveAdvisorInputSchema = z.object({
  businessType: z
    .string()
    .describe('The type of business (e.g., restaurant, retail, tech).'),
  location: z
    .string()
    .describe(
      'The location of the business (e.g., West Hollywood, Los Angeles).'      
    ),
  employeeCount: z
    .number()
    .describe('The number of employees the business has.'),
  revenue: z
    .number()
    .describe('The annual revenue of the business in USD.'),
  goals: z
    .string()
    .describe(
      'The goals the business has (e.g., expansion, sustainability, job creation).'
    ),
});
export type IncentiveAdvisorInput = z.infer<typeof IncentiveAdvisorInputSchema>;

const IncentiveAdvisorOutputSchema = z.object({
  recommendedIncentives: z
    .array(z.string())
    .describe(
      'A list of recommended incentives based on the business profile.'
    ),
  summary: z.string().describe('A summary of why these incentives are recommended.'),
});
export type IncentiveAdvisorOutput = z.infer<typeof IncentiveAdvisorOutputSchema>;

export async function incentiveAdvisor(input: IncentiveAdvisorInput): Promise<IncentiveAdvisorOutput> {
  return incentiveAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'incentiveAdvisorPrompt',
  input: {schema: IncentiveAdvisorInputSchema},
  output: {schema: IncentiveAdvisorOutputSchema},
  prompt: `You are an expert business advisor specializing in West Hollywood business incentives. Based on the business profile provided, recommend the best incentives for the business.

Business Type: {{{businessType}}}
Location: {{{location}}}
Employee Count: {{{employeeCount}}}
Revenue: {{{revenue}}}
Goals: {{{goals}}}

Provide a list of recommended incentives and a summary of why each incentive is recommended.`, // Modified to include summary
});

const incentiveAdvisorFlow = ai.defineFlow(
  {
    name: 'incentiveAdvisorFlow',
    inputSchema: IncentiveAdvisorInputSchema,
    outputSchema: IncentiveAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
