'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { Suspense, useState } from "react";
import { ChatSection } from "../modules/[moduleId]/components/ChatSection";

interface FloatingChatProps {
  instructorName: string;
  instructorAvatar: string;
}

export function FloatingChat({ instructorName, instructorAvatar }: FloatingChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="absolute bottom-0 left-[280px] pointer-events-none">
      <div className={cn(
        "w-[400px] transition-all duration-300 ease-in-out z-50 pointer-events-auto",
        isChatOpen ? "h-[600px]" : "h-16"
      )}>
        <div className="bg-gradient-to-r from-green-50 to-amber-50 shadow-lg rounded-t-lg h-full border border-green-200 overflow-hidden">
          {isChatOpen ? (
            <div className="h-full">
              <div className="p-4 border-b border-green-200 flex justify-between items-center bg-green-100/50">
                <h3 className="font-semibold text-green-800 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  Chat with Instructor
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsChatOpen(false)}
                  className="text-green-700 hover:text-green-800 hover:bg-green-200/50"
                >
                  Close
                </Button>
              </div>
              <div className="h-[calc(100%-65px)] bg-white/90">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full text-green-700">
                    Loading chat...
                  </div>
                }>
                  <ChatSection
                    instructorName={instructorName}
                    instructorAvatar={instructorAvatar}
                  />
                </Suspense>
              </div>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              className="w-full h-full flex items-center justify-center gap-2 text-green-700 hover:text-green-800 hover:bg-green-100/50"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle className="h-5 w-5" />
              Chat with Instructor
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
