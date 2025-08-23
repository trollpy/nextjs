'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { WorkerCard } from './WorkerCard';
import { WorkerForm } from './WorkerForm';

interface WorkerListProps {
  preloadedWorkers?: any;
}

export function WorkerList({ preloadedWorkers }: WorkerListProps) {
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
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {filteredWorkers?.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              {searchTerm ? 'No team members found.' : 'No team members added yet.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers?.map((worker: any) => (
            <WorkerCard key={worker._id} worker={worker} />
          ))}
        </div>
      )}

      <WorkerForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}