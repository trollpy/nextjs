'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Users, 
  CreditCard,
  Settings as SettingsIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsItems = [
  {
    name: 'Company',
    href: '/dashboard/settings/company',
    icon: Building,
    description: 'Manage your company profile and settings',
  },
  {
    name: 'Team',
    href: '/dashboard/settings/workers',
    icon: Users,
    description: 'Manage team members and permissions',
  },
  {
    name: 'Billing',
    href: '/dashboard/settings/billing',
    icon: CreditCard,
    description: 'Manage your subscription and billing',
  },
];

export function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}>
              <Card className={cn(
                "hover:shadow-md transition-shadow cursor-pointer",
                isActive && "border-primary"
              )}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}