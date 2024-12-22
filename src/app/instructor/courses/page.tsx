'use client'

import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useInstructorCourses } from '@/hooks/useApi'
import { BookOpen, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const InstructorCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = parseInt(searchParams.get('page')) || 1
  const limit = parseInt(searchParams.get('limit')) || 10
  const search = searchParams.get('search') || ''
  const { data, error, isLoading } = useInstructorCourses(page, limit, {
    search,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }

  const courses = data.data || []

  const handleSearch = () => {
    router.push('/instructor/courses?' + createQueryString('search', searchQuery))
  }

  return (
    <div className="space-y-8">
      <PageHeader
        heading="Your Courses"
        text="Manage and track all your courses in one place."
        action={{
          icon: Plus,
          label: 'Create Course',
          href: '/instructor/courses/new',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </PageHeader>

      {(!courses || courses.length === 0) ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description={
            search
              ? `No courses match "${search}". Try a different search term.`
              : "You haven't created any courses yet. Start sharing your knowledge!"
          }
          actionLabel="Create Course"
          actionLink="/instructor/courses/new"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="aspect-video relative mb-2">
                  <Image
                    src={course.image || '/images/course-placeholder.jpg'}
                    alt={course.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Badge variant="secondary">
                    {course.enrolledStudents || 0} students
                  </Badge>
                  {course.isPublished ? (
                    <Badge variant="success">Published</Badge>
                  ) : (
                    <Badge variant="warning">Draft</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button asChild className="w-full">
                  <Link href={`/instructor/courses/${course.id}`}>
                    Manage Course
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {data.total > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: data.total }, (_, i) => (
            <Button
              key={i + 1}
              variant={page === i + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                router.push(
                  '/instructor/courses?' + createQueryString('page', String(i + 1))
                )
              }
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default InstructorCoursesPage
