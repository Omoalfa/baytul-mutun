'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'instructor';
  timestamp: Date;
}

interface ChatSectionProps {
  instructorName: string;
  instructorAvatar: string;
}

export function ChatSection({ instructorName, instructorAvatar }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Simulate instructor response (replace with actual API call)
    setTimeout(() => {
      const instructorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your question. I'll get back to you shortly.",
        sender: 'instructor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, instructorMessage]);
    }, 1000);
  };

  return (
    <Card>
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat with Instructor</h3>
        <p className="text-sm text-muted-foreground">
          Ask questions about this module's content
        </p>
      </div>

      <ScrollArea className="h-[300px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
