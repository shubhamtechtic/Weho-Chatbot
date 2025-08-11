import { IncentiveAdvisorForm } from "./form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function IncentiveAdvisorPage() {
  return (
    <div className="space-y-8 container mx-auto px-4 md:px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">AI Incentive Advisor</h1>
        <p className="mt-2 text-lg text-muted-foreground">Get personalized incentive recommendations for your business.</p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BrainCircuit className="w-12 h-12 text-foreground" />
          </div>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>
            Provide some details about your business, and our AI advisor will suggest the most relevant incentives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IncentiveAdvisorForm />
        </CardContent>
      </Card>
    </div>
  );
}
