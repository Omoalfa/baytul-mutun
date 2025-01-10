'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Video, FileText, Headphones } from 'lucide-react';

interface Content {
  type: 'video' | 'audio' | 'pdf';
  url: string;
  title: string;
}

interface ContentViewerProps {
  contents: Content[];
  moduleId: number;
  grade?: number;
  hasAttemptedTest: boolean;
  onStartTest: () => void;
}

export function ContentViewer({ contents, moduleId, grade, hasAttemptedTest, onStartTest }: ContentViewerProps) {
  const [activeContent, setActiveContent] = useState(contents[0]?.type || 'video');
  const [showTestDialog, setShowTestDialog] = useState(false);

  console.log(contents, "CONTENT");

  const renderContent = (content: Content) => {
    switch (content.type) {
      case 'video':
        return (
          <div className="aspect-video">
            <video
              src={content.url}
              controls
              className="h-full w-full rounded-lg"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="flex items-center justify-center p-8">
            <audio src={content.url} controls className="w-full" />
          </div>
        );
      case 'pdf':
        return (
          <iframe
            src={content.url}
            className="h-[600px] w-full rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  const handleStartTest = () => {
    setShowTestDialog(false);
    onStartTest();
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeContent} onValueChange={(value) => setActiveContent(value as "video" | "audio" | "pdf")}>
        <TabsList className="w-full justify-start">
          {contents.map((content) => (
            <TabsTrigger key={content.type} value={content.type} className="flex items-center">
              {content.type === 'video' && <Video className="mr-2 h-4 w-4" />}
              {content.type === 'audio' && <Headphones className="mr-2 h-4 w-4" />}
              {content.type === 'pdf' && <FileText className="mr-2 h-4 w-4" />}
              {content.type}
            </TabsTrigger>
          ))}
        </TabsList>

        {contents.map((content) => (
          <TabsContent key={content.type} value={content.type}>
            {renderContent(content)}
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-6">
        <div className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-semibold">Module Progress</h3>
            {grade !== undefined ? (
              <p className="text-sm text-muted-foreground">
                Your grade: {grade}%
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Take the test to complete this module
              </p>
            )}
          </div>

          {!hasAttemptedTest ? (
            <AlertDialog open={showTestDialog} onOpenChange={setShowTestDialog}>
              <AlertDialogTrigger asChild>
                <Button onClick={() => setShowTestDialog(true)}>Take Test</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-slate-900 p-6">
                <AlertDialogHeader className="mb-6">
                  <AlertDialogTitle className="text-xl font-bold text-black dark:text-white">
                    Ready to Take the Test?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-800 dark:text-slate-200">
                    <p className="mb-4">Before you begin:</p>
                    <ul className="list-disc pl-6 space-y-3">
                      <li>Make sure you have reviewed all the module content</li>
                      <li>Ensure you have a stable internet connection</li>
                      <li>Find a quiet place where you can focus</li>
                      <li>You'll have one attempt at this test</li>
                    </ul>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-3 mt-8">
                  <AlertDialogCancel 
                    onClick={() => setShowTestDialog(false)}
                    className="border-2 border-gold text-gold hover:bg-gold hover:text-white"
                  >
                    Not Yet
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleStartTest}
                    className="bg-green text-white hover:bg-green-dark"
                  >
                    Start Test
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button disabled>Test Completed</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
