'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate instructor response (replace with actual API call)
    setTimeout(() => {
      const instructorMessage: Message = {
        id: (Math.random() + 1).toString(),
        content: "Thank you for your question. I'll get back to you shortly.",
        sender: 'instructor',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, instructorMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat with Instructor</h3>
        <p className="text-sm text-muted-foreground">
          Ask questions about this module's content
        </p>
      </div>

      <ScrollArea className="flex-1 p-4 pb-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg p-3 max-w-[80%]",
                  message.sender === 'user' 
                    ? "bg-green-100 text-green-900 ml-auto" 
                    : "bg-amber-50 text-amber-900"
                )}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-green-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
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
      </div>
    </div>
  );
}
