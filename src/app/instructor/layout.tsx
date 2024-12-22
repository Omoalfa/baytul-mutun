'use client'

import { useAuth } from "@/hooks/useAuth"
import { AccessDenied } from "@/components/access-denied"
import { LoadingPage } from "@/components/loading"
import SidebarNav from "./(components)/SidebarNav"
import { HiBell, HiQuestionMarkCircle } from 'react-icons/hi'
import clsx from 'clsx'

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingPage />
  }

  if (!user) {
    return (
      <AccessDenied
        title="Authentication Required"
        message="Please log in to access the instructor portal."
        redirectUrl="/auth/login"
      />
    )
  }

  if (!user.roles.includes('instructor')) {
    return (
      <AccessDenied
        title="Access Denied"
        message="This area is restricted to instructors only."
        redirectUrl="/dashboard"
      />
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1">
        {/* Top bar with notifications */}
        <div className="sticky top-0 z-10 flex items-center justify-end h-16 px-6 bg-gray-900 text-white">
          <button className="p-2 text-gray-400 rounded-lg hover:text-white hover:bg-gray-800">
            <HiBell size={24} />
          </button>
        </div>

        {/* Main content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>

        {/* Floating support button */}
        <button 
          className={clsx(
            "fixed bottom-6 right-6 flex items-center px-4 py-2 space-x-2",
            "bg-gray-900 text-white rounded-full shadow-lg",
            "hover:bg-gray-800 transition-colors"
          )}
        >
          <HiQuestionMarkCircle size={20} />
          <span>Support</span>
        </button>
      </div>
    </div>
  )
}
