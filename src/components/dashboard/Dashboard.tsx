'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardProps {
  preloadedTasks?: any;
  preloadedProjects?: any;
}

export function Dashboard({ preloadedTasks, preloadedProjects }: DashboardProps) {
  const tasks = useQuery(api.tasks.getByCompany, { companyId: 'placeholder' }) || preloadedTasks;
  const projects = useQuery(api.projects.getByCompany, { companyId: 'placeholder' }) || preloadedProjects;
  const workers = useQuery(api.workers.getByCompany, { companyId: 'placeholder' });

  if (!tasks || !projects || !workers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t: any) => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter((t: any) => 
    t.dueDate && t.status !== 'completed' && new Date(t.dueDate) < new Date()
  ).length;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Recent tasks
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's what's happening with your tasks today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueTasks}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Task Completion Rate</span>
                <span className="font-medium">{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Projects: </span>
                  <span className="font-medium">{projects.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Team Members: </span>
                  <span className="font-medium">{workers.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No tasks yet.</p>
            ) : (
              <div className="space-y-4">
                {recentTasks.map((task: any) => (
                  <div key={task._id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {task.assignee?.name} • {task.priority}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/dashboard/tasks">View All Tasks</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16" asChild>
              <Link href="/dashboard/tasks">
                <CheckCircle className="h-5 w-5 mr-2" />
                Create Task
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16" asChild>
              <Link href="/dashboard/workers">
                <Users className="h-5 w-5 mr-2" />
                Add Team Member
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16" asChild>
              <Link href="/dashboard/projects">
                <Calendar className="h-5 w-5 mr-2" />
                New Project
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16" asChild>
              <Link href="/dashboard/reports">
                <TrendingUp className="h-5 w-5 mr-2" />
                Generate Report
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}