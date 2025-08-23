'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  TrendingUp,
  Calendar
} from 'lucide-react';

interface KPIDashboardProps {
  preloadedTasks?: any;
  preloadedWorkers?: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function KPIDashboard({ preloadedTasks, preloadedWorkers }: KPIDashboardProps) {
  const tasks = useQuery(api.tasks.getByCompany, { companyId: 'placeholder' }) || preloadedTasks;
  const workers = useQuery(api.workers.getByCompany, { companyId: 'placeholder' }) || preloadedWorkers;

  if (!tasks || !workers) {
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

  // Prepare data for charts
  const statusData = [
    { name: 'Completed', value: completedTasks },
    { name: 'In Progress', value: inProgressTasks },
    { name: 'To Do', value: tasks.filter((t: any) => t.status === 'todo').length },
    { name: 'Review', value: tasks.filter((t: any) => t.status === 'review').length },
  ];

  const priorityData = [
    { name: 'Urgent', value: tasks.filter((t: any) => t.priority === 'urgent').length },
    { name: 'High', value: tasks.filter((t: any) => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter((t: any) => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter((t: any) => t.priority === 'low').length },
  ];

  const workerPerformance = workers.map((worker: any) => {
    const workerTasks = tasks.filter((t: any) => t.assigneeId === worker._id);
    const completed = workerTasks.filter((t: any) => t.status === 'completed').length;
    return {
      name: worker.name,
      completed,
      total: workerTasks.length,
      rate: workerTasks.length > 0 ? (completed / workerTasks.length) * 100 : 0,
    };
  });

  const weeklyData = [
    { week: 'Week 1', tasks: 12, completed: 8 },
    { week: 'Week 2', tasks: 18, completed: 15 },
    { week: 'Week 3', tasks: 15, completed: 12 },
    { week: 'Week 4', tasks: 22, completed: 18 },
  ];

  return (
    <div className="space-y-6">
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
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
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tasks" stroke="#8884d8" name="Total Tasks" />
                <Line type="monotone" dataKey="completed" stroke="#82ca9d" name="Completed Tasks" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
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
      </div>
    </div>
  );
}