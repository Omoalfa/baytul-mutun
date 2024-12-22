'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const InstructorNav = () => {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    { label: 'Dashboard', href: '/instructor' },
    { label: 'Courses', href: '/instructor/courses' },
    { label: 'Students', href: '/instructor/students' },
    { label: 'Assignments', href: '/instructor/assignments' },
    { label: 'Analytics', href: '/instructor/analytics' },
  ]

  return (
    <nav className="bg-gray-800 text-white">
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
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-300 mr-4">
              Instructor: {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default InstructorNav
