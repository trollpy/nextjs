'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  User, 
  AlertCircle,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Send,
  Edit
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TaskForm } from './TaskForm';

interface TaskDetailsProps {
  preloadedTask?: any;
  preloadedComments?: any;
  taskId: string;
}

const priorityIcons = {
  urgent: AlertCircle,
  high: ArrowUp,
  medium: ArrowRight,
  low: ArrowDown,
};

const priorityColors = {
  urgent: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

export function TaskDetails({ preloadedTask, preloadedComments, taskId }: TaskDetailsProps) {
  const task = useQuery(api.tasks.get, { taskId: taskId as Id<'tasks'> }) || preloadedTask;
  const comments = useQuery(api.tasks.getComments, { taskId: taskId as Id<'tasks'> }) || preloadedComments;
  const addComment = useMutation(api.tasks.addComment);
  
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const PriorityIcon = task ? priorityIcons[task.priority as keyof typeof priorityIcons] : AlertCircle;

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment({
        taskId: taskId as Id<'tasks'>,
        authorId: 'placeholder' as any, // This should be the current user's ID
        content: comment,
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!task) {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
          {task.project && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Project: {task.project.name}
            </p>
          )}
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {task.description || 'No description provided.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments?.map((comment: any) => (
                  <div key={comment._id} className="border-l-4 border-primary pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{comment.author?.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(comment.createdAt), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{comment.content}</p>
                  </div>
                ))}
                
                <form onSubmit={handleAddComment} className="pt-4">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button type="submit" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="outline" className="capitalize">
                  {task.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Priority</span>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'capitalize',
                    priorityColors[task.priority as keyof typeof priorityColors]
                  )}
                >
                  <PriorityIcon className="h-3 w-3 mr-1" />
                  {task.priority}
                </Badge>
              </div>
              
              {task.assignee && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Assignee</span>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                </div>
              )}
              
              {task.dueDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Due Date</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(task.updatedAt), 'MMM dd, yyyy')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TaskForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        task={task}
      />
    </div>
  );
}