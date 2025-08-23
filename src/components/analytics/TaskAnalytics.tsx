'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface TaskAnalyticsProps {
  preloadedTasks?: any;
}

export function TaskAnalytics({ preloadedTasks }: TaskAnalyticsProps) {
  const tasks = useQuery(api.tasks.getByCompany, { companyId: 'placeholder' }) || preloadedTasks;

  if (!tasks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Prepare data for charts
  const statusData = [
    { name: 'Completed', value: tasks.filter((t: any) => t.status === 'completed').length },
    { name: 'In Progress', value: tasks.filter((t: any) => t.status === 'in-progress').length },
    { name: 'To Do', value: tasks.filter((t: any) => t.status === 'todo').length },
    { name: 'Review', value: tasks.filter((t: any) => t.status === 'review').length },
  ];

  const priorityData = [
    { name: 'Urgent', value: tasks.filter((t: any) => t.priority === 'urgent').length },
    { name: 'High', value: tasks.filter((t: any) => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter((t: any) => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter((t: any) => t.priority === 'low').length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}