'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { WorkerForm } from '@/components/workers/WorkerForm';

interface WorkerManagementProps {
  preloadedWorkers?: any;
}

export function WorkerManagement({ preloadedWorkers }: WorkerManagementProps) {
  const workers = useQuery(api.workers.getByCompany, { companyId: 'placeholder' }) || preloadedWorkers;
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredWorkers = workers?.filter((worker: any) =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!workers) {
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
            placeholder="Search team members..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button onClick={() => setIsFormOpen(true)}>
          Add Team Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members ({filteredWorkers?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredWorkers?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No team members found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWorkers?.map((worker: any) => (
                <div key={worker._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{worker.name}</h4>
                    <p className="text-sm text-muted-foreground">{worker.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {worker.position} • {worker.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Permissions
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <WorkerForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}