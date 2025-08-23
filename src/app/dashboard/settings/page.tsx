import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { SettingsNavigation } from '@/components/settings/SettingsNavigation';

export default async function SettingsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and workspace settings
        </p>
      </div>
      <SettingsNavigation />
    </div>
  );
}