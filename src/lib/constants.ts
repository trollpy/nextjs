export const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 border-red-200' },
] as const;

export const STATUSES = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'review', label: 'Review', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' },
] as const;

export const PROJECT_STATUSES = [
  { value: 'planning', label: 'Planning', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  { value: 'active', label: 'Active', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'on-hold', label: 'On Hold', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
] as const;

export const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Support',
  'Operations',
  'Human Resources',
  'Finance',
  'Product',
  'Quality Assurance',
] as const;

export const POSITIONS = [
  'Developer',
  'Designer',
  'Manager',
  'Analyst',
  'Specialist',
  'Director',
  'Executive',
  'Coordinator',
  'Assistant',
  'Intern',
] as const;

export const ROLES = [
  { value: 'admin', label: 'Administrator', level: 4 },
  { value: 'manager', label: 'Manager', level: 3 },
  { value: 'user', label: 'User', level: 2 },
  { value: 'viewer', label: 'Viewer', level: 1 },
] as const;

export const EMAIL_TEMPLATES = {
  TASK_ASSIGNMENT: {
    subject: 'New Task Assigned: {taskTitle}',
    body: `Hello {assigneeName},

You have been assigned a new task:

Task: {taskTitle}
Priority: {taskPriority}
Due Date: {dueDate}
Project: {projectName}

Description:
{taskDescription}

Please log in to the task management system to view details and update progress.

Best regards,
{companyName} Team`
  },
  TASK_UPDATE: {
    subject: 'Task Updated: {taskTitle}',
    body: `Hello {assigneeName},

The following task has been updated:

Task: {taskTitle}
Status: {taskStatus}
Priority: {taskPriority}
Due Date: {dueDate}

Changes:
{updates}

Please review the updates and adjust your work accordingly.

Best regards,
{companyName} Team`
  },
  TASK_OVERDUE: {
    subject: 'URGENT: Task Overdue - {taskTitle}',
    body: `Hello {assigneeName},

The following task is overdue:

Task: {taskTitle}
Due Date: {dueDate}
Current Status: {taskStatus}

Please complete this task as soon as possible and update the status in the system.

Best regards,
{companyName} Team`
  }
} as const;

export const REPORT_TYPES = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export const CHART_COLORS = [
  '#0088FE', // blue
  '#00C49F', // teal
  '#FFBB28', // yellow
  '#FF8042', // orange
  '#8884D8', // purple
  '#82CA9D', // green
  '#FF6B6B', // red
  '#4ECDC4', // turquoise
  '#45B7D1', // light blue
  '#F9A825', // amber
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];