
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, User, Bot } from 'lucide-react';
import { Markdown } from './markdown';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  
  const handleSubmit = async (q: string) => {
    if (!q || loading) return;

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setQuestion('');
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', text: q }, { role: 'bot', text: '' }]);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chatbot-v2/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          query: q,
          thread_id: 'default',
          language: 'English',
        }),
      });

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        // This regex looks for the "data: " prefix and extracts the content.
        const lines = chunk.match(/data: (.*)/g);
        if (lines) {
          const newText = lines.map(line => line.substring(6)).join('');
          fullResponse += newText;
        }
      }
      
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'bot') {
            lastMessage.text = fullResponse;
        }
        return newMessages;
      });

    } catch (e) {
      console.error(e);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'bot') {
          lastMessage.text = 'Sorry, I encountered an error. Please try again.';
        }
        return newMessages;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(question);
  };
  
  const handleSuggestedQuestion = async (q: string) => {
    handleSubmit(q);
  };


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
                {message.text ? (
                    <div className="text-sm whitespace-pre-wrap"><Markdown text={message.text} /></div>
                ) : (
                    <Loader2 className="w-5 h-5 animate-spin" />
                )}
              </div>
              {message.role === 'user' && (
                <div className="p-2 bg-secondary rounded-full">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleQuestionSubmit}
          className="space-y-4"
        >
          {messages.length === 0 && (
             <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                    <Button
                    key={q}
                    variant="secondary"
                    type="button"
                    onClick={() => handleSuggestedQuestion(q)}
                    >
                    {q}
                    </Button>
                ))}
             </div>
          )}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
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
