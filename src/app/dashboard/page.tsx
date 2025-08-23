import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload data for the dashboard
  const preloadedTasks = await preloadQuery(api.tasks.getByAssignee, { 
    assigneeId: 'placeholder' // This will be replaced with actual user data
  });
  
  const preloadedProjects = await preloadQuery(api.projects.getByCompany, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  return (
    <div className="container mx-auto p-4">
      <Dashboard 
        preloadedTasks={preloadedTasks}
        preloadedProjects={preloadedProjects}
      />
    </div>
  );
}