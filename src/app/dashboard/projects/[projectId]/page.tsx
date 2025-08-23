import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { ProjectDetails } from '@/components/projects/ProjectDetails';

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload project data
  const preloadedProject = await preloadQuery(api.projects.get, { 
    projectId: params.projectId as any
  });

  return (
    <div className="container mx-auto p-4">
      <ProjectDetails 
        preloadedProject={preloadedProject}
        projectId={params.projectId}
      />
    </div>
  );
}