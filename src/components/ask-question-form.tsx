
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const suggestions = [
    "How to get Business License",
    "Funding & Incentives",
    "topic hint",
]

export function AskQuestionForm() {
    return (
        <Card className="p-4 md:p-6">
            <CardContent className="p-0">
                <Input placeholder="Ask a question" className="w-full mb-4 text-base" />
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                        <Button key={suggestion} variant="secondary">
                            {suggestion}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
