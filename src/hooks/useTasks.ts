'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export function useTasks(companyId?: Id<'companies'>) {
  const tasks = useQuery(api.tasks.getByCompany, { 
    companyId: companyId as Id<'companies'> 
  });
  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);
  const updateStatus = useMutation(api.tasks.updateStatus);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const addComment = useMutation(api.tasks.addComment);

  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    search: '',
  });

  useEffect(() => {
    if (!tasks) return;

    let result = tasks;

    // Apply filters
    if (filters.status !== 'all') {
      result = result.filter(task => task.status === filters.status);
    }

    if (filters.priority !== 'all') {
      result = result.filter(task => task.priority === filters.priority);
    }

    if (filters.assignee !== 'all') {
      result = result.filter(task => task.assigneeId === filters.assignee);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.assignee?.name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredTasks(result);
  }, [tasks, filters]);

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getTasksByPriority = (priority: string) => {
    return filteredTasks.filter(task => task.priority === priority);
  };

  const getTasksByAssignee = (assigneeId: string) => {
    return filteredTasks.filter(task => task.assigneeId === assigneeId);
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    isLoading: !tasks,
    filters,
    setFilters,
    createTask,
    updateTask,
    updateStatus,
    deleteTask,
    addComment,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByAssignee,
  };
}