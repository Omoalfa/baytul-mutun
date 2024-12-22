'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle } from 'lucide-react';
import { CourseModule, UserCourseModule } from '@/types';
import { BsCheckCircle, BsCircle, BsCircleHalf } from 'react-icons/bs';

interface ModulesSidebarProps {
  courseId: string;
  modules: CourseModule[];
  userModules: UserCourseModule[];
  currentModuleId: number;
}

export function ModulesSidebar({ courseId, modules, userModules, currentModuleId }: ModulesSidebarProps) {
  

  return (
    <nav className="space-y-1">
      <h2 className="mb-4 font-semibold">Course Modules</h2>
      {modules.map((module) => {
        const userModule = userModules.find((um) => um.moduleId === module.id);
        return <Link
          key={module.id}
          href={`/dashboard/courses/${courseId}/modules/${module.id}`}
          className={cn(
            'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium',
            (module.id === currentModuleId) && 'bg-accent',
          )}
        >
          <span className="truncate">{module.title}</span>
          {(userModule && userModule.status === 'completed') ? (
            <BsCheckCircle className="h-4 w-4 text-primary" />
          ) : userModule?.status === 'in_progress' ? (
            <BsCircleHalf className="h-4 w-4 text-primary" />
          ) : (
            <BsCircle className="h-4 w-4" />
          )}
        </Link>
      })}
    </nav>
  );
}
