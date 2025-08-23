'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ProjectForm } from './ProjectForm';

interface ProjectListProps {
  preloadedProjects?: any;
}

export function ProjectList({ preloadedProjects }: ProjectListProps) {
  const projects = useQuery(api.projects.getByCompany, { companyId: 'placeholder' }) || preloadedProjects;
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredProjects = projects?.filter((project: any) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!projects) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {filteredProjects?.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              {searchTerm ? 'No projects found.' : 'No projects created yet.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects?.map((project: any) => (
            <Card key={project._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(project.status)}
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {project.description && (
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {project.completedTasks} of {project.taskCount} tasks completed
                    </span>
                  </div>
                  
                  <Progress 
                    value={project.taskCount > 0 ? (project.completedTasks / project.taskCount) * 100 : 0} 
                    className="h-2" 
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Manager: </span>
                      <span className="font-medium">{project.manager?.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completion: </span>
                      <span className="font-medium">
                        {project.taskCount > 0 
                          ? Math.round((project.completedTasks / project.taskCount) * 100) 
                          : 0
                        }%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProjectForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}