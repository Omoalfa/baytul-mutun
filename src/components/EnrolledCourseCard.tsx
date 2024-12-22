import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EnrolledCourse } from '@/types';
import Image from 'next/image';

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
  progress: number;
  grade: number;
  onClick?: () => void;
}

export function EnrolledCourseCard({
  course,
  progress,
  grade,
  onClick,
}: EnrolledCourseCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <Image
          src={course.course.image || '/placeholder.png'}
          alt={course.course.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{course.course.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {course.course.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="w-full">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        {grade > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Grade</span>
            <span className="font-semibold">{Math.round(grade)}%</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
