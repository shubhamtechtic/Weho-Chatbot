
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const suggestedQuestions = [
    { text: "How do I get a business license?", href: "/pre-application" },
    { text: "Are there any incentives?", href: "/incentives" },
    { text: "What district best fits my business?", href: "/find-your-district" },
]

export function AskQuestionForm() {
    return (
        <Card className="p-4 md:p-6 bg-card/50 text-left">
            <CardContent className="p-0">
                <Input placeholder="Ask a question" className="w-full mb-4 text-base" />
                <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                        <Button key={q.text} variant="secondary" asChild>
                            <Link href={q.href}>{q.text}</Link>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
