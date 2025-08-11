'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RotateCw, Award } from 'lucide-react';
import type { Incentive } from '@/lib/types';
import { incentives } from '@/lib/data';

const questions = [
  {
    id: 'businessType',
    title: 'What is your business type?',
    options: ['Restaurant', 'Retail', 'Tech', 'Arts & Culture', 'Other'],
  },
  {
    id: 'employees',
    title: 'How many employees do you have?',
    options: ['1-10', '11-50', '51-200', '200+'],
  },
  {
    id: 'goals',
    title: 'What are your primary goals?',
    options: ['Expansion', 'Sustainability', 'Job Creation', 'Community Engagement'],
  },
];

const mockResults: Incentive[] = incentives.slice(0, 3);

export default function GrantFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[step];
  const progress = (step / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  }

  if (showResults) {
    return (
        <div className="space-y-8 container mx-auto px-4 md:px-6 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">Matching Grants Found</h1>
                <p className="mt-2 text-lg text-muted-foreground">Based on your answers, here are some grants you may be eligible for.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockResults.map((grant) => (
                    <Card key={grant.title} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award className="text-foreground" />{grant.title}</CardTitle>
                            <CardDescription>{grant.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{grant.category}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="text-center">
                <Button onClick={handleRestart}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Start Over
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-col items-center container mx-auto px-4 md:px-6 py-12">
        <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Grant Finder</h1>
                <p className="mt-2 text-lg text-muted-foreground">Answer a few questions to find grants for your business.</p>
            </div>

            <Card>
                <CardHeader>
                    <Progress value={progress} className="mb-4" />
                    <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
                    <CardDescription>Step {step + 1} of {questions.length}</CardDescription>
                </CardHeader>
                <CardContent>
                <RadioGroup value={answers[currentQuestion.id]} onValueChange={handleAnswer} className="gap-4">
                    {currentQuestion.options.map((option) => (
                    <Label key={option} htmlFor={option} className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-secondary has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-state=checked]]:border-primary transition-colors">
                        <RadioGroupItem value={option} id={option} className="sr-only" />
                        <span className="text-lg font-medium">{option}</span>
                    </Label>
                    ))}
                </RadioGroup>
                </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack} disabled={step === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                    {step === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  );
}
