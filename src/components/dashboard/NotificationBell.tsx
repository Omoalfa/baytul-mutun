import { Bell } from 'lucide-react';
import { Button } from '../ui/button';

export function NotificationBell() {
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-white">
          3
        </span>
      </Button>
    </div>
  );
}
