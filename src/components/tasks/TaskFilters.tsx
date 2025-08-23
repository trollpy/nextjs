'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface TaskFiltersProps {
  filters: {
    priority: string;
    assignee: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
  const workers = useQuery(api.workers.getByCompany, { companyId: 'placeholder' });

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priority: 'all',
      assignee: 'all',
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>
      
      <Select
        value={filters.priority}
        onValueChange={(value) => handleFilterChange('priority', value)}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="urgent">Urgent</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
      
      <Select
        value={filters.assignee}
        onValueChange={(value) => handleFilterChange('assignee', value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          {workers?.map((worker) => (
            <SelectItem key={worker._id} value={worker._id}>
              {worker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {(filters.priority !== 'all' || filters.assignee !== 'all') && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}