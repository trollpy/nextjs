'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Briefcase, Building, User } from 'lucide-react';

interface WorkerCardProps {
  worker: any;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Link href={`/dashboard/workers/${worker._id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{worker.name}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {worker.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{worker.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{worker.position}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{worker.department}</span>
          </div>
          
          {worker.userId && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>User Account Linked</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}