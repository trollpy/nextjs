import { ReactNode } from 'react';
import { DashboardLayout as Layout } from '@/components/layout/DashboardLayout';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Layout>{children}</Layout>;
}