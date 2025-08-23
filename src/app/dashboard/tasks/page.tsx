import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { TaskBoard } from '@/components/tasks/TaskBoard';

export default async function TasksPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload tasks data
  const preloadedTasks = await preloadQuery(api.tasks.getByCompany, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Board</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track all your team's tasks
        </p>
      </div>
      <TaskBoard preloadedTasks={preloadedTasks} />
    </div>
  );
}