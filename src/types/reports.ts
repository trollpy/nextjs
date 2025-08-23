import { Id } from '@/convex/_generated/dataModel';

export interface Report {
  _id: Id<'reports'>;
  _creationTime: number;
  companyId: Id<'companies'>;
  type: 'weekly' | 'monthly';
  period: string;
  generatedBy: Id<'users'>;
  generatedAt: number;
  data: any;
  pdfUrl?: string;
}

export interface ReportWithGenerator extends Report {
  generatedByUser: any; // User type
}

export interface ReportData {
  period: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  completionRate: number;
  workerPerformance: WorkerPerformance[];
  tasksByPriority: TaskPriorityStats;
  tasksByStatus: TaskStatusStats;
}

export interface WeeklyReportData extends ReportData {
  startDate: number;
  endDate: number;
}

export interface MonthlyReportData extends ReportData {
  year: number;
  month: number;
  projectProgress: ProjectProgress[];
}

export interface WorkerPerformance {
  workerId: Id<'workers'>;
  workerName: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  avgCompletionTime?: number;
}

export interface ProjectProgress {
  projectId: Id<'projects'>;
  projectName: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}

export interface TaskPriorityStats {
  urgent: number;
  high: number;
  medium: number;
  low: number;
}

export interface TaskStatusStats {
  todo: number;
  inProgress: number;
  review: number;
  completed: number;
}

export interface ReportGenerateOptions {
  type: 'weekly' | 'monthly';
  startDate?: Date;
  endDate?: Date;
  year?: number;
  month?: number;
}