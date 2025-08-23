import { Id } from '@/convex/_generated/dataModel';

export interface Worker {
  _id: Id<'workers'>;
  _creationTime: number;
  companyId: Id<'companies'>;
  name: string;
  email: string;
  position: string;
  department: string;
  userId?: Id<'users'>;
  createdAt: number;
  isActive: boolean;
}

export interface WorkerWithUser extends Worker {
  user?: any; // User type
}

export interface WorkerCreateData {
  name: string;
  email: string;
  position: string;
  department: string;
  userId?: string;
}

export interface WorkerUpdateData extends Partial<WorkerCreateData> {}

export interface WorkerFilters {
  department: string;
  search: string;
  activeOnly: boolean;
}