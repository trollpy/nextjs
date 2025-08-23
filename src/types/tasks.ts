import { Id } from '@/convex/_generated/dataModel';

export interface Task {
  _id: Id<'tasks'>;
  _creationTime: number;
  companyId: Id<'companies'>;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: Id<'workers'>;
  projectId?: Id<'projects'>;
  dueDate?: number;
  createdAt: number;
  updatedAt: number;
  createdBy: Id<'users'>;
}

export interface TaskWithDetails extends Task {
  assignee: any; // Worker type
  project?: any; // Project type
  createdByUser: any; // User type
}

export interface TaskComment {
  _id: Id<'taskComments'>;
  _creationTime: number;
  taskId: Id<'tasks'>;
  authorId: Id<'users'>;
  content: string;
  createdAt: number;
}

export interface TaskCommentWithAuthor extends TaskComment {
  author: any; // User type
}

export interface TaskAttachment {
  _id: Id<'taskAttachments'>;
  _creationTime: number;
  taskId: Id<'tasks'>;
  fileName: string;
  fileUrl: string;
  uploadedBy: Id<'users'>;
  uploadedAt: number;
}

export interface TaskFilters {
  status: string;
  priority: string;
  assignee: string;
  search: string;
  project?: string;
}

export interface TaskCreateData {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId: string;
  projectId?: string;
  dueDate?: Date;
}

export interface TaskUpdateData extends Partial<TaskCreateData> {
  updatedAt: number;
}