
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  answerQuestion,
  type AnswerQuestionOutput,
} from '@/ai/flows/answer-question-flow';
import { Loader2, Sparkles, User, Bot } from 'lucide-react';

const suggestedQuestions = [
  'How do I get a business license?',
  'Are there any incentives?',
  'What district best fits my business?',
];

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export function AskQuestionForm() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleQuestionSubmit(q: string) {
    if (!q || loading) return;

    setQuestion('');
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', text: q }]);

    try {
      const response = await answerQuestion({ question: q });
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: response.answer },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4 md:p-6 bg-card/50 text-left w-full">
      <CardContent className="p-0">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'bot' && (
                <div className="p-2 bg-primary rounded-full text-primary-foreground">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
              {message.role === 'user' && (
                <div className="p-2 bg-secondary rounded-full">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          {loading && (
             <div className="flex items-start gap-3">
                <div className="p-2 bg-primary rounded-full text-primary-foreground">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-3 rounded-lg bg-secondary">
                    <Loader2 className="w-5 h-5 animate-spin" />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuestionSubmit(question);
          }}
          className="space-y-4"
        >
          {messages.length === 0 && (
             <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                    <Button
                    key={q}
                    variant="secondary"
                    type="button"
                    onClick={() => handleQuestionSubmit(q)}
                    >
                    {q}
                    </Button>
                ))}
             </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question..."
              className="w-full text-base"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !question}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span className="sr-only">Submit</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
