'use client';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Award, BookOpen, CheckCircle, Lock } from 'lucide-react';
import { useEnrolledCourseDetails } from '@/hooks/useApi';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ModulesSidebar } from '../../components/ModulesSidebar';
import { FloatingChat } from '../../components/FloatingChat';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
    moduleId: string;
  };
}

export default function ModuleLayout({ children, params }: LayoutProps) {
  const { data: courseResponse, isLoading: courseLoading } = useEnrolledCourseDetails(params.id);

  if (courseLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const course = courseResponse?.data;
  const modules = course?.course?.modules;
  const allModulesCompleted = course.modules?.every(module => module.status === 'completed');

  if (!course) {
    return null;
  }

  return (
    <div className="container py-8">
      <div className="flex gap-6">
        {/* Main Content Column (Left Side) */}
        <div className="flex-1 space-y-6">
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

          {/* Module Content (children) */}
          {children}

          {/* Final Exam and Certification Section */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-lg p-6 border border-green-100 dark:border-green-900">
            <div className="space-y-6">
              {/* Final Exam Section */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Final Assessment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete this final assessment to demonstrate your mastery of {course.course.title}. 
                    May Allah grant you success in your pursuit of knowledge.
                  </p>
                </div>
                {allModulesCompleted ? (
                  <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                    Start Final Exam
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Complete all modules to unlock</span>
                  </div>
                )}
              </div>

              {/* Certification Section */}
              <div className="flex items-start justify-between pt-4 border-t border-green-100 dark:border-green-900">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Course Certification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upon successful completion of the course and final exam with a grade of 70% or higher, 
                    you'll receive a certificate of completion. This achievement marks your dedication to 
                    Islamic education - "Seeking knowledge is an obligation upon every Muslim."
                  </p>
                  {course.grade >= 70 && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Alhamdulillah! You've qualified for certification</span>
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  className="border-green-200 hover:bg-green-50"
                  disabled={course.grade < 70}
                >
                  Generate Certificate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <ModulesSidebar
          modules={modules}
          courseId={params.id}
          currentModuleId={Number(params.moduleId)}
          userModules={course.modules}
        />

        {/* Floating Chat */}
        <FloatingChat
          instructorName={`${course.course.instructor.firstName} ${course.course.instructor.lastName}`}
          instructorAvatar={course.course.instructor.avatar}
        />
      </div>
    </div>
  );
}
