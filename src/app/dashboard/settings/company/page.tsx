import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { CompanySettings } from '@/components/settings/CompanySettings';

export default async function CompanySettingsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Preload company data
  const preloadedCompany = await preloadQuery(api.companies.getByOwner, { 
    ownerId: 'placeholder' // This will be replaced with actual user data
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your company profile and settings
        </p>
      </div>
      <CompanySettings preloadedCompany={preloadedCompany} />
    </div>
  );
}