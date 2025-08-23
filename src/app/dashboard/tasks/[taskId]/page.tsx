import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { TaskDetails } from '@/components/tasks/TaskDetails';

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

export default async function TaskPage({ params }: TaskPageProps) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload task data
  const preloadedTask = await preloadQuery(api.tasks.get, { 
    taskId: params.taskId as any
  });

  // Preload comments
  const preloadedComments = await preloadQuery(api.tasks.getComments, { 
    taskId: params.taskId as any
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <TaskDetails 
        preloadedTask={preloadedTask}
        preloadedComments={preloadedComments}
        taskId={params.taskId}
      />
    </div>
  );
}