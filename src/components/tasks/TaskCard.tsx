'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  User, 
  AlertCircle,
  ArrowUp,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
  task: any;
}

const priorityIcons = {
  urgent: AlertCircle,
  high: ArrowUp,
  medium: ArrowRight,
  low: ArrowDown,
};

const priorityColors = {
  urgent: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

export function TaskCard({ task }: TaskCardProps) {
  const PriorityIcon = priorityIcons[task.priority as keyof typeof priorityIcons];
  
  return (
    <Link href={`/dashboard/tasks/${task._id}`}>
      <Card className="task-card hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base font-medium line-clamp-2">
              {task.title}
            </CardTitle>
            <PriorityIcon className={cn(
              'h-4 w-4 flex-shrink-0',
              task.priority === 'urgent' && 'text-red-500',
              task.priority === 'high' && 'text-orange-500',
              task.priority === 'medium' && 'text-yellow-500',
              task.priority === 'low' && 'text-green-500'
            )} />
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              {task.assignee && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="text-xs">{task.assignee.name}</span>
                </div>
              )}
              
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">
                    {format(new Date(task.dueDate), 'MMM dd')}
                  </span>
                </div>
              )}
            </div>
            
            <Badge 
              variant="outline" 
              className={cn(
                'text-xs',
                priorityColors[task.priority as keyof typeof priorityColors]
              )}
            >
              {task.priority}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}