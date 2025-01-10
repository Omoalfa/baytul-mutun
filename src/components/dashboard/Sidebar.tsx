import { cn } from '@/lib/utils';
import { Book, GraduationCap, Home, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Courses', href: '/dashboard/courses', icon: Book },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div 
      className={cn(
        "flex h-full flex-col bg-white shadow-lg transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center",
        isCollapsed ? "px-4" : "px-6"
      )}>
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-gold" />
          {!isCollapsed && <span className="text-xl font-semibold text-black">Baytul Mutun</span>}
        </Link>
      </div>

      {/* Collapse Button */}
      <div className={cn(
        "flex border-b border-gray-200",
        isCollapsed ? "px-2" : "px-4"
      )}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "mb-2 flex w-full justify-between items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gold/5 hover:text-gold",
          )}
        >
          {!isCollapsed && <span className={cn("transition-opacity px-2")}>Collapse Menu</span>}
          <ChevronLeft className={cn(
            "h-8 w-8 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 space-y-1 py-4",
        isCollapsed ? "px-2" : "px-4"
      )}>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center py-2 text-sm font-medium rounded-md',
                isCollapsed ? "px-2 justify-center" : "px-3",
                isActive
                  ? 'bg-gold/10 text-gold'
                  : 'text-gray-600 hover:bg-gold/5 hover:text-gold'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  !isCollapsed && 'mr-3',
                  isActive ? 'text-gold' : 'text-gray-400 group-hover:text-gold'
                )}
                aria-hidden="true"
              />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className={cn(
        "border-t border-gray-200 p-4",
        isCollapsed ? "px-2" : "px-4"
      )}>
        <Link
          href="/dashboard/settings"
          className={cn(
            'group flex items-center py-2 text-sm font-medium rounded-md',
            isCollapsed ? "px-2 justify-center" : "px-3",
            'text-gray-600 hover:bg-gold/5 hover:text-gold'
          )}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className={cn(
            'h-5 w-5 flex-shrink-0',
            !isCollapsed && 'mr-3',
            'text-gray-400 group-hover:text-gold'
          )} />
          {!isCollapsed && "Settings"}
        </Link>
      </div>
    </div>
  );
}
