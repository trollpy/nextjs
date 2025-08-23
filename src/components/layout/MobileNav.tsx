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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-y-0 left-0 w-3/4 bg-background border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">TaskManager Pro</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )}
                onClick={onClose}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}