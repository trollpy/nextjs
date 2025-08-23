import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { WorkerManagement } from '@/components/settings/WorkerManagement';

export default async function WorkerSettingsPage() {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your team members and their permissions
        </p>
      </div>
      <WorkerManagement preloadedWorkers={preloadedWorkers} />
    </div>
  );
}