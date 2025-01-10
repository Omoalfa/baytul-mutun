'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { ContentViewer } from './components/ContentViewer';
import { useModuleDetails } from '@/hooks/useApi';
import { Badge } from '@/components/ui/badge';

interface PageProps {
  params: {
    id: number;
    moduleId: number;
  };
}

export default function ModuleDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { data: moduleResponse, isLoading } = useModuleDetails(params.moduleId, params.id);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const module = moduleResponse?.data;

  if (!module) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{module?.module?.title}</CardTitle>
          <Badge>Module {module?.module?.order}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading content...</div>}>
          <ContentViewer
            contents={[
              { type: 'video', url: module?.module?.videoUrl, title: module?.module?.title },
              { type: 'audio', url: module?.module?.audioUrl, title: module?.module?.title },
              { type: 'pdf', url: module?.module?.attachments[0], title: module?.module?.title },
            ]}
            moduleId={params.moduleId}
            grade={module?.totalScore / (module?.maxPossibleScore ?? 5) * 100}
            hasAttemptedTest={!!module?.attemptedQuestions}
            onStartTest={() => {
              router.push(`/dashboard/courses/${params.id}/modules/${params.moduleId}/test`);
            }}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
