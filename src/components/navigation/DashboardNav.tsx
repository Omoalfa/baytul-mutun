'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const DashboardNav = () => {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'My Courses', href: '/dashboard/courses' },
    { label: 'Progress', href: '/dashboard/progress' },
    { label: 'Assignments', href: '/dashboard/assignments' },
    { label: 'Profile', href: '/dashboard/profile' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/images/logo.png" alt="Logo" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              Welcome, {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav
