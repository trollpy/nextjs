import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { BillingSettings } from '@/components/settings/BillingSettings';

export default async function BillingSettingsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your subscription and billing information
        </p>
      </div>
      <BillingSettings />
    </div>
  );
}