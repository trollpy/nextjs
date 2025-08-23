'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export function useWorkers(companyId?: Id<'companies'>) {
  const workers = useQuery(api.workers.getByCompany, { 
    companyId: companyId as Id<'companies'> 
  });
  const createWorker = useMutation(api.workers.create);
  const updateWorker = useMutation(api.workers.update);
  const deactivateWorker = useMutation(api.workers.deactivate);
  const assignUser = useMutation(api.workers.assignUser);

  const [filteredWorkers, setFilteredWorkers] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    department: 'all',
    search: '',
    activeOnly: true,
  });

  useEffect(() => {
    if (!workers) return;

    let result = workers;

    // Apply filters
    if (filters.department !== 'all') {
      result = result.filter(worker => worker.department === filters.department);
    }

    if (filters.activeOnly) {
      result = result.filter(worker => worker.isActive);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(worker =>
        worker.name.toLowerCase().includes(searchLower) ||
        worker.email.toLowerCase().includes(searchLower) ||
        worker.position.toLowerCase().includes(searchLower) ||
        worker.department.toLowerCase().includes(searchLower)
      );
    }

    setFilteredWorkers(result);
  }, [workers, filters]);

  const getWorkersByDepartment = (department: string) => {
    return filteredWorkers.filter(worker => worker.department === department);
  };

  const getActiveWorkers = () => {
    return filteredWorkers.filter(worker => worker.isActive);
  };

  const getInactiveWorkers = () => {
    return filteredWorkers.filter(worker => !worker.isActive);
  };

  return {
    workers: filteredWorkers,
    allWorkers: workers,
    isLoading: !workers,
    filters,
    setFilters,
    createWorker,
    updateWorker,
    deactivateWorker,
    assignUser,
    getWorkersByDepartment,
    getActiveWorkers,
    getInactiveWorkers,
  };
}