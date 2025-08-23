import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { ProjectList } from '@/components/projects/ProjectList';

export default async function ProjectsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload projects data
  const preloadedProjects = await preloadQuery(api.projects.getByCompany, { 
    companyId: 'placeholder' // This will be replaced with actual company data
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your projects and track their progress
        </p>
      </div>
      <ProjectList preloadedProjects={preloadedProjects} />
    </div>
  );
}