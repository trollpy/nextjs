import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { ReportGenerator } from '@/components/reports/ReportGenerator';

export default async function ReportsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload reports data
  const preloadedReports = await preloadQuery(api.reports.getReports, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate and view performance reports
        </p>
      </div>
      <ReportGenerator preloadedReports={preloadedReports} />
    </div>
  );
}