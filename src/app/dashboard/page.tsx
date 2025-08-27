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

  try {
    // First get the user from Convex using Clerk ID
    const convexUser = await preloadQuery(api.users.getByClerkId, { 
      clerkId: user.id 
    });

    let preloadedTasks = null;
    let preloadedProjects = null;

    if (convexUser) {
      // Get the worker record for this user
      const worker = await preloadQuery(api.workers.getByClerkUserId, { 
        clerkUserId: user.id 
      });

      if (worker) {
        // Preload tasks assigned to this worker
        preloadedTasks = await preloadQuery(api.tasks.getByAssignee, { 
          assigneeId: worker._id
        });
      }

      // Preload projects for the user's company
      preloadedProjects = await preloadQuery(api.projects.getByCompany, { 
        companyId: convexUser.companyId
      });
    }

    return (
      <div className="container mx-auto p-4">
        <Dashboard 
          preloadedTasks={preloadedTasks}
          preloadedProjects={preloadedProjects}
          user={convexUser}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    // Return dashboard without preloaded data if there's an error
    return (
      <div className="container mx-auto p-4">
        <Dashboard 
          preloadedTasks={null}
          preloadedProjects={null}
          user={null}
        />
      </div>
    );
  }
}