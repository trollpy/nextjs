import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { KPIDashboard } from '@/components/analytics/KPIDashboard';

export default async function AnalyticsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload tasks data for analytics
  const preloadedTasks = await preloadQuery(api.tasks.getByCompany, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  // Preload workers data for analytics
  const preloadedWorkers = await preloadQuery(api.workers.getByCompany, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track performance metrics and KPIs
        </p>
      </div>
      <KPIDashboard 
        preloadedTasks={preloadedTasks}
        preloadedWorkers={preloadedWorkers}
      />
    </div>
  );
}