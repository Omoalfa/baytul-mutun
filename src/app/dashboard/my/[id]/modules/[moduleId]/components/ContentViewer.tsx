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

  return (
    <div className="space-y-4">
      <Tabs value={activeContent} onValueChange={(value) => setActiveContent(value as "video" | "audio" | "pdf")}>
        <TabsList className="w-full justify-start">
          {contents.map((content) => (
            <TabsTrigger key={content.type} value={content.type} className="flex items-center">
              {content.type === 'video' && <Video className="mr-2 h-4 w-4" />}
              {content.type === 'audio' && <Headphones className="mr-2 h-4 w-4" />}
              {content.type === 'pdf' && <FileText className="mr-2 h-4 w-4" />}
              {content.title}
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Take Test</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you ready to take the test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please note that you can only take this test once. Make sure you are prepared before starting. If you close the test page, your answers will be automatically submitted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onStartTest}>Start Test</AlertDialogAction>
                </AlertDialogFooter>
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
