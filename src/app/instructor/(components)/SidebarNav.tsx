'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiHome, HiAcademicCap, HiUsers, HiChatAlt2, HiChevronLeft, HiChevronRight, HiLogout } from 'react-icons/hi'
import { useAuth } from '@/hooks/useAuth'
import clsx from 'clsx'

const navItems = [
  { href: '/instructor', icon: HiHome, label: 'Dashboard' },
  { href: '/instructor/courses', icon: HiAcademicCap, label: 'Courses' },
  { href: '/instructor/students', icon: HiUsers, label: 'Students' },
  { href: '/instructor/discussions', icon: HiChatAlt2, label: 'Discussions' },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { logout } = useAuth()

  return (
    <nav className={clsx(
      'flex flex-col h-screen bg-gray-900 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && <span className="text-xl font-bold text-white">Instructor</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {isCollapsed ? <HiChevronRight size={20} /> : <HiChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center px-4 py-3 mb-1 transition-colors',
                isActive
                  ? 'text-white bg-gray-800'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                isCollapsed && 'justify-center'
              )}
            >
              <item.icon size={24} />
              {!isCollapsed && (
                <span className="ml-3">{item.label}</span>
              )}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className={clsx(
            'flex items-center w-full px-4 py-3 text-gray-400 rounded-lg hover:text-white hover:bg-gray-800 transition-colors',
            isCollapsed ? 'justify-center' : ''
          )}
        >
          <HiLogout size={24} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </nav>
  )
}
