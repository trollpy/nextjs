import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { WeeklyReport } from '@/components/reports/WeeklyReport';

export default async function WeeklyReportsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and generate weekly performance reports
        </p>
      </div>
      <WeeklyReport />
    </div>
  );
}