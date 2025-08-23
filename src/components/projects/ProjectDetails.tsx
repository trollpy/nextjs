'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, User, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectDetailsProps {
  preloadedProject?: any;
  projectId: string;
}

export function ProjectDetails({ preloadedProject, projectId }: ProjectDetailsProps) {
  const project = useQuery(api.projects.get, { projectId: projectId as Id<'projects'> }) || preloadedProject;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">{project.description}</p>
          )}
        </div>
        <Badge 
          variant="outline" 
          className={getStatusColor(project.status)}
        >
          {project.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Tasks Completed</span>
                  <span className="font-medium">
                    {project.tasks?.filter((t: any) => t.status === 'completed').length} of {project.tasks?.length} tasks
                  </span>
                </div>
                
                <Progress 
                  value={project.tasks?.length > 0 
                    ? (project.tasks.filter((t: any) => t.status === 'completed').length / project.tasks.length) * 100 
                    : 0
                  } 
                  className="h-3" 
                />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">To Do: </span>
                    <span className="font-medium">
                      {project.tasks?.filter((t: any) => t.status === 'todo').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">In Progress: </span>
                    <span className="font-medium">
                      {project.tasks?.filter((t: any) => t.status === 'in-progress').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Review: </span>
                    <span className="font-medium">
                      {project.tasks?.filter((t: any) => t.status === 'review').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Completed: </span>
                    <span className="font-medium">
                      {project.tasks?.filter((t: any) => t.status === 'completed').length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {project.tasks?.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No tasks assigned to this project yet.</p>
              ) : (
                <div className="space-y-3">
                  {project.tasks?.map((task: any) => (
                    <div key={task._id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {task.assignee?.name} • {task.priority}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Project Manager</p>
                  <p className="text-sm text-muted-foreground">{project.manager?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-muted-foreground">
                    {project.startDate ? format(new Date(project.startDate), 'MMM dd, yyyy') : 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">End Date</p>
                  <p className="text-sm text-muted-foreground">
                    {project.endDate ? format(new Date(project.endDate), 'MMM dd, yyyy') : 'Not set'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Tasks</p>
                  <p className="text-sm text-muted-foreground">{project.tasks?.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                Add Task to Project
              </Button>
              <Button variant="outline" className="w-full">
                Generate Project Report
              </Button>
              <Button variant="outline" className="w-full">
                Edit Project Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}