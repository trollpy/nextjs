import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { WorkerPerformance } from '@/components/workers/WorkerPerformance';

interface WorkerPageProps {
  params: {
    workerId: string;
  };
}

export default async function WorkerPage({ params }: WorkerPageProps) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload worker data
  const preloadedWorker = await preloadQuery(api.workers.get, { 
    workerId: params.workerId as any
  });

  // Preload worker tasks
  const preloadedTasks = await preloadQuery(api.tasks.getByAssignee, { 
    assigneeId: params.workerId as any
  });

  return (
    <div className="container mx-auto p-4">
      <WorkerPerformance 
        preloadedWorker={preloadedWorker}
        preloadedTasks={preloadedTasks}
        workerId={params.workerId}
      />
    </div>
  );
}