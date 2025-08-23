import { EMAIL_TEMPLATES } from './constants';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function compileTemplate(
  template: string,
  variables: Record<string, string>
): string {
  return template.replace(/{(\w+)}/g, (_, key) => variables[key] || '');
}

export async function sendTaskAssignmentEmail(
  to: string,
  variables: {
    assigneeName: string;
    taskTitle: string;
    taskPriority: string;
    dueDate: string;
    projectName: string;
    taskDescription: string;
    companyName: string;
  }
): Promise<boolean> {
  const subject = compileTemplate(EMAIL_TEMPLATES.TASK_ASSIGNMENT.subject, variables);
  const text = compileTemplate(EMAIL_TEMPLATES.TASK_ASSIGNMENT.body, variables);
  const html = text.replace(/\n/g, '<br>');

  return sendEmail({
    to,
    subject,
    html,
    text,
  });
}

export async function sendTaskUpdateEmail(
  to: string,
  variables: {
    assigneeName: string;
    taskTitle: string;
    taskStatus: string;
    taskPriority: string;
    dueDate: string;
    updates: string;
    companyName: string;
  }
): Promise<boolean> {
  const subject = compileTemplate(EMAIL_TEMPLATES.TASK_UPDATE.subject, variables);
  const text = compileTemplate(EMAIL_TEMPLATES.TASK_UPDATE.body, variables);
  const html = text.replace(/\n/g, '<br>');

  return sendEmail({
    to,
    subject,
    html,
    text,
  });
}

export async function sendTaskOverdueEmail(
  to: string,
  variables: {
    assigneeName: string;
    taskTitle: string;
    dueDate: string;
    taskStatus: string;
    companyName: string;
  }
): Promise<boolean> {
  const subject = compileTemplate(EMAIL_TEMPLATES.TASK_OVERDUE.subject, variables);
  const text = compileTemplate(EMAIL_TEMPLATES.TASK_OVERDUE.body, variables);
  const html = text.replace(/\n/g, '<br>');

  return sendEmail({
    to,
    subject,
    html,
    text,
  });
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeEmailContent(content: string): string {
  // Basic sanitization to prevent XSS
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}