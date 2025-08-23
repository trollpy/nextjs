'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Folder, 
  BarChart3, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Team',
    href: '/dashboard/workers',
    icon: Users,
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: Folder,
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      'relative flex flex-col bg-background border-r h-full',
      isCollapsed ? 'w-16' : 'w-64',
      className
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold">TaskManager Pro</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
                isCollapsed ? 'justify-center' : 'justify-start'
              )}
            >
              <item.icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
              {!isCollapsed && item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}