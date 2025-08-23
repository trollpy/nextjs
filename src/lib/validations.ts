import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
  status: z.enum(['todo', 'in-progress', 'review', 'completed']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assigneeId: z.string().min(1, 'Assignee is required'),
  projectId: z.string().optional(),
  dueDate: z.date().optional(),
});

export const workerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(1, 'Position is required').max(100, 'Position too long'),
  department: z.string().min(1, 'Department is required').max(100, 'Department too long'),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  status: z.enum(['planning', 'active', 'completed', 'on-hold']),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  managerId: z.string().min(1, 'Manager is required'),
});

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100, 'Company name too long'),
});

export const reportSchema = z.object({
  type: z.enum(['weekly', 'monthly']),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  year: z.number().min(2000).max(2100).optional(),
  month: z.number().min(1).max(12).optional(),
});

export const emailSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message too long'),
});

export type TaskFormData = z.infer<typeof taskSchema>;
export type WorkerFormData = z.infer<typeof workerSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type ReportFormData = z.infer<typeof reportSchema>;
export type EmailFormData = z.infer<typeof emailSchema>;