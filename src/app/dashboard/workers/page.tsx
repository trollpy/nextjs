import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { WorkerList } from '@/components/workers/WorkerList';

export default async function WorkersPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload workers data
  const preloadedWorkers = await preloadQuery(api.workers.getByCompany, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Members</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your team members and their roles
        </p>
      </div>
      <WorkerList preloadedWorkers={preloadedWorkers} />
    </div>
  );
}