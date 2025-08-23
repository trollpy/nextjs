'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';

interface TaskBoardProps {
  preloadedTasks?: any;
}

export function TaskBoard({ preloadedTasks }: TaskBoardProps) {
  const tasks = useQuery(api.tasks.getByCompany, { companyId: 'placeholder' }) || preloadedTasks;
  const updateTaskStatus = useMutation(api.tasks.updateStatus);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'all',
    assignee: 'all',
  });

  const statusColumns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'completed', title: 'Completed' },
  ];

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const taskId = draggableId as Id<'tasks'>;
    const newStatus = destination.droppableId as any;

    await updateTaskStatus({ taskId, status: newStatus });
  };

  const filteredTasks = tasks?.filter((task: any) => {
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.assignee !== 'all' && task.assigneeId !== filters.assignee) return false;
    return true;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks?.filter((task: any) => task.status === status) || [];
  };

  if (!tasks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TaskFilters filters={filters} onFiltersChange={setFilters} />
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusColumns.map((column) => (
            <div key={column.id} className="column">
              <h3 className="font-semibold text-lg mb-4 text-center">
                {column.title} ({getTasksByStatus(column.id).length})
              </h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-96 space-y-3"
                  >
                    {getTasksByStatus(column.id).map((task: any, index: number) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}