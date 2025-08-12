
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleQuestionSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = question;
    if (!q || loading) return;

    setQuestion('');
    setLoading(true);
    inputRef.current?.focus();
    
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
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.substring(6);
                if (data) {
                    setMessages((prev) => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'bot') {
                            lastMessage.text += data;
                        }
                        return newMessages;
                    });
                }
            }
        }
      }

    } catch (e) {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'bot') {
            lastMessage.text = 'Sorry, I encountered an error. Please try again.';
        }
        return newMessages
      });
      console.error(e);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }
  
  async function handleSuggestedQuestion(q: string) {
    if (loading) return;
    
    inputRef.current?.focus();
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
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data) {
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'bot') {
                  lastMessage.text += data;
                }
                return newMessages;
              });
            }
          }
        }
      }

    } catch (e) {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'bot') {
            lastMessage.text = 'Sorry, I encountered an error. Please try again.';
        }
        return newMessages
      });
      console.error(e);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
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
                {message.text ? (
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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
