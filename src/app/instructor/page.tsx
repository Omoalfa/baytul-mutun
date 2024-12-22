'use client'

import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useInstructorCourse, useInstructorCourses } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { formatToNaira } from '@/lib/utils/currency'
import { BookOpen, DollarSign, GraduationCap, Plus, Timer } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    title: 'Total Courses',
    value: '0',
    icon: BookOpen,
    description: 'Active courses',
  },
  {
    title: 'Total Students',
    value: '0',
    icon: GraduationCap,
    description: 'Enrolled students',
  },
  {
    title: 'Total Hours',
    value: '0',
    icon: Timer,
    description: 'Content duration',
  },
  {
    title: 'Total Earnings',
    value: '$0',
    icon: DollarSign,
    description: 'Revenue generated',
  },
]

const InstructorDashboardPage = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useInstructorCourses()

  return (
    <div className="space-y-8">
      <PageHeader
        heading={`Hello, ${user?.firstName} ${user?.lastName}!`}
        text="Welcome back! Here's an overview of your teaching activities."
        action={{
          icon: Plus,
          label: 'Create Course',
          href: '/instructor/courses/new',
        }}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Best Selling Courses</h2>
          <Button variant="outline" asChild>
            <Link href="/instructor/courses">View all courses</Link>
          </Button>
        </div>

        {
          isLoading && <div>Loading...</div>
        }{
          error && <div>Error: {error.message}</div>
        }
        {
        data?.data?.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            description="Start creating your first course and share your knowledge with students."
            actionLabel="Create Course"
            actionLink="/instructor/courses/new"
          />
        ) : (
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Course</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Students</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Revenue</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {data?.data?.map((course) => (
                    <tr key={course.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{course.title}</td>
                      <td className="p-4 align-middle">
                        <Badge variant="secondary">
                          {course.enrolledStudents || 0} students
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant="success">{formatToNaira(course.price * course.enrolledStudents)}</Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/instructor/courses/${course.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InstructorDashboardPage
