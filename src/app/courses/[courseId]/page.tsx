import { Suspense } from 'react';
import Image from 'next/image';
import { FaClock, FaGraduationCap, FaDollarSign } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { EnrollButton } from './components/EnrollButton';
import { CourseAccordion } from './components/CourseAccordion';
import Link from 'next/link';
import { formatToNaira } from '@/lib/utils/currency';
import { IoMdCash } from 'react-icons/io';

interface PageProps {
  params: {
    courseId: number;
  };
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { data: course } = await api.getCourse(params.courseId);

  if (!course) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="mt-2 text-gray-600">Course not found</p>
          <Link href="/courses">
            <Button className="mt-4">
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  console.log(course);

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-4 text-gray-600">{course.description}</p>

          <div className="mt-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <FaClock className="mr-2 text-primary" />
                <span>{course.moduleCount} Modules</span>
              </div>
              <span>|</span>
              <div className="flex items-center">
                <FaClock className="mr-2 text-primary" />
                <span>{course.duration} Weeks</span>
              </div>
              <span>|</span>
              <div className="flex items-center">
                <FaGraduationCap className="mr-2 text-primary" />
                <span>{course.enrolledStudents} Students</span>
              </div>
              <span>|</span>
              <div className="flex items-center">
                <IoMdCash className="mr-2 text-primary" />
                <span>{formatToNaira(course.price)}</span>
              </div>
            </div>
          </div>

          <Suspense>
            <CourseAccordion 
              objectives={course.objectives}
              requirements={course.prerequisites}
            />
          </Suspense>
        </div>

        <div>
          <div className="sticky top-8 rounded-lg border bg-card p-6 shadow-sm">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={course.image || '/placeholder.png'}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6">
              <div className="mb-4">
                <h3 className="font-semibold">Instructor</h3>
                <div className="mt-2 flex items-center">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={course.instructor.avatar || '/placeholder.png'}
                      alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {course.instructor.email}
                    </p>
                  </div>
                </div>
              </div>

              <Suspense>
                <EnrollButton courseId={params.courseId} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
