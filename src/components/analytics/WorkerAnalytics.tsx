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

interface WorkerAnalyticsProps {
  preloadedTasks?: any;
  preloadedWorkers?: any;
}

export function WorkerAnalytics({ preloadedTasks, preloadedWorkers }: WorkerAnalyticsProps) {
  const tasks = useQuery(api.tasks.getByCompany, { companyId: 'placeholder' }) || preloadedTasks;
  const workers = useQuery(api.workers.getByCompany, { companyId: 'placeholder' }) || preloadedWorkers;

  if (!tasks || !workers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Prepare worker performance data
  const workerPerformance = workers.map((worker: any) => {
    const workerTasks = tasks.filter((t: any) => t.assigneeId === worker._id);
    const completed = workerTasks.filter((t: any) => t.status === 'completed').length;
    return {
      name: worker.name,
      completed,
      total: workerTasks.length,
      completionRate: workerTasks.length > 0 ? (completed / workerTasks.length) * 100 : 0,
    };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={workerPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#8884d8" name="Completed Tasks" />
              <Bar dataKey="total" fill="#82ca9d" name="Total Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workerPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completionRate" fill="#FF8042" name="Completion Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}