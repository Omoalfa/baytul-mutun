'use client';

import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
import { EnrolledCourseCard } from '@/components/EnrolledCourseCard';
import { useRouter } from 'next/navigation';
import { AlertTriangleIcon, InboxIcon, Loader2 } from 'lucide-react';
import { useEnrolledCourses } from '@/hooks/useApi';

export default function MyCourses() {
  const router = useRouter();
  const { data: courses, isLoading, error } = useEnrolledCourses();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error"
        description="Failed to load courses"
        actionLabel='Retry'
        actionLink='/dashboard/courses'
        icon={AlertTriangleIcon}
      />
    );
  }

  if (!courses?.data?.length) {
    return (
      <EmptyState
        icon={InboxIcon}
        title="No courses found"
        description="You haven't enrolled in any courses yet."
        actionLink='/courses'
        actionLabel='Explore Courses'
      />
    );
  }

  return (
    <div className="container py-8">
      <PageHeader
        heading="My Courses"
        text="Continue learning from where you left off"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.data.map((course) => (
          <EnrolledCourseCard
            key={course.id}
            course={course}
            progress={course.progress}
            grade={course.grade}
            onClick={() => {
              // Redirect directly to the current module
              if (course.currentModuleId) {
                router.push(`/dashboard/courses/${course.course.id}/modules/${course.currentModuleId}`);
              } else {
                // If no current module, start with the first one
                router.push(`/dashboard/courses/${course.course.id}/modules/${course.course.modules[0].id}`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
