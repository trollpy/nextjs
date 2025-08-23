'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function useAuth() {
  const { user, isLoaded } = useUser();
  const userData = useQuery(api.users.get, { 
    userId: user?.id as any 
  });

  return {
    user,
    userData,
    isLoaded,
    isAuthenticated: !!user,
    isLoading: !isLoaded || !userData,
  };
}