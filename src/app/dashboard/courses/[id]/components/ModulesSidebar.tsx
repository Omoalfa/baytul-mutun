'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CourseModule, UserCourseModule } from '@/types';
import { Card } from "@/components/ui/card";

interface ModulesSidebarProps {
  courseId: string;
  modules: CourseModule[];
  userModules: UserCourseModule[];
  currentModuleId: number;
}

export function ModulesSidebar({ courseId, modules, userModules, currentModuleId }: ModulesSidebarProps) {
  

  return (
    <div className="hidden lg:block w-[350px] shrink-0">
      <div className="sticky top-0 h-[calc(100vh-6rem)] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
        <div className="space-y-4 pr-4">
          {modules?.map((module) => {
            const userModule = userModules.find((um) => um.moduleId === module.id);
            const moduleStatus = userModule?.status || 'not_started';
            const grade = userModule?.totalScore / (userModule?.maxPossibleScore ?? 5) * 100;
            
            const getGradeColor = (grade: number) => {
              if (grade >= 80) return "text-green-600";
              if (grade >= 60) return "text-amber-600";
              return "text-red-600";
            };
            
            return (
              <Link 
                key={module.id}
                href={`/dashboard/courses/${courseId}/modules/${module.id}`}
              >
                <Card
                  className={cn(
                    'p-4 hover:bg-accent cursor-pointer transition-colors relative',
                    Number(currentModuleId) === module.id && 'bg-accent'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2",
                      moduleStatus === 'completed' && 'bg-primary',
                      moduleStatus === 'in_progress' && 'bg-yellow-500',
                      moduleStatus === 'not_started' && 'bg-muted-foreground'
                    )} />
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      {module.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </p>
                      )}
                      <div className="text-xs text-muted-foreground mt-2 capitalize">
                        Status: {moduleStatus.replace('_', ' ')}
                        {moduleStatus === 'completed' && grade && (
                          <span className={cn("ml-2", getGradeColor(grade))}>
                            • Grade: {grade.toFixed(2)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
