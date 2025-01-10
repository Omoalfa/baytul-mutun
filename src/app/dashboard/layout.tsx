'use client'

import DashboardNav from '@/components/navigation/DashboardNav'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { NotificationBell } from '@/components/dashboard/NotificationBell';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { SupportButton } from '@/components/dashboard/SupportButton';
import { UserMenu } from '@/components/dashboard/UserMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !user.roles.includes('student')) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-green-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-end px-8 space-x-4">
          <NotificationBell />
          <UserMenu />
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Support Button */}
      <SupportButton />
    </div>
  )
}
