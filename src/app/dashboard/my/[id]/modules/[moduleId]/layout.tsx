'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { ChatSection } from './components/ChatSection';
import { useEnrolledCourseDetails } from '@/hooks/useApi';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ModulesSidebar } from '../../components/ModulesSidebar';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
    moduleId: string;
  };
}

export default function ModuleLayout({ children, params }: LayoutProps) {
  const router = useRouter();
  const { data: { data: course }, isLoading: courseLoading } = useEnrolledCourseDetails(params.id);

  if (courseLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Course Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{course.course.title}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Overall Progress
              </p>
            </div>
            <Badge variant={course.grade >= 70 ? "success" : "default"}>
              Grade: {course.grade}%
            </Badge>
          </div>
          <Progress value={course.progress} className="mt-2" />
        </CardHeader>
      </Card>

      {/* Module Content */}
      {children}

      {/* Module Sidebar */}
      <ModulesSidebar courseId={params.id} modules={course.course.modules} userModules={course.modules} currentModuleId={course.currentModuleId} />

      {/* Chat Section */}
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatSection
          instructorName={`${course.course.instructor.firstName} ${course.course.instructor.lastName}`}
          instructorAvatar={course.course.instructor.image}
        />
      </Suspense>
    </div>
  );
}
