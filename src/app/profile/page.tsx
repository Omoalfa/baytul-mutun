'use client'

import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen, GraduationCap, Settings, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  {
    icon: BookOpen,
    value: '5',
    label: 'Active Courses',
  },
  {
    icon: GraduationCap,
    value: '12',
    label: 'Completed Courses',
  },
]

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <EmptyState
        icon={User}
        title="Not Signed In"
        description="Please sign in to view your profile"
        actionLabel="Sign In"
        actionLink="/auth/login"
      />
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        heading="Profile"
        text="Manage your account settings and view your progress"
        action={{
          icon: Settings,
          label: 'Settings',
          href: '/settings',
        }}
      />

      {/* Profile Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={user.avatar || '/images/avatar-placeholder.jpg'}
                  alt={user.firstName || 'Profile picture'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {user.roles?.map((role) => (
                    <Badge key={role} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <Input value={user.firstName} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <Input value={user.lastName} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input value={user.email} readOnly />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/settings">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Stats */}
        <div className="space-y-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest course progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Course Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Introduction to Fiqh</h4>
                  <p className="text-sm text-muted-foreground">
                    Last accessed 2 days ago
                  </p>
                </div>
                <Badge>75% Complete</Badge>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Arabic Grammar Basics</h4>
                  <p className="text-sm text-muted-foreground">
                    Last accessed 5 days ago
                  </p>
                </div>
                <Badge>40% Complete</Badge>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: '40%' }}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/dashboard">View All Courses</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">First Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Completed your first course
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">Dedicated Learner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Completed 10+ courses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-center">Active Member</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Member for 1+ year
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
