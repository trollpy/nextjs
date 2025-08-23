'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Briefcase, 
  Building, 
  User,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

interface WorkerPerformanceProps {
  preloadedWorker?: any;
  preloadedTasks?: any;
  workerId: string;
}

export function WorkerPerformance({ preloadedWorker, preloadedTasks, workerId }: WorkerPerformanceProps) {
  const worker = useQuery(api.workers.get, { workerId: workerId as Id<'workers'> }) || preloadedWorker;
  const tasks = useQuery(api.tasks.getByAssignee, { assigneeId: workerId as Id<'workers'> }) || preloadedTasks;

  if (!worker || !tasks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const completedTasks = tasks.filter((task: any) => task.status === 'completed');
  const inProgressTasks = tasks.filter((task: any) => task.status === 'in-progress');
  const overdueTasks = tasks.filter((task: any) => 
    task.dueDate && task.status !== 'completed' && new Date(task.dueDate) < new Date()
  );

  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Name</span>
              <span className="text-sm">{worker.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email</span>
              <span className="text-sm">{worker.email}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Position</span>
              <span className="text-sm">{worker.position}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Department</span>
              <span className="text-sm">{worker.department}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={worker.isActive ? 'default' : 'secondary'}>
                {worker.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Member Since</span>
              <span className="text-sm">
                {format(new Date(worker.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-bold">{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{tasks.length}</div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{completedTasks.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{inProgressTasks.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{overdueTasks.length}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="p-2 bg-gray-100 rounded-full">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{tasks.length}</div>
                <div className="text-sm text-muted-foreground">Total Assigned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}