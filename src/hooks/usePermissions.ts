'use client';

import { useAuth } from './useAuth';
import { 
  canCreate, 
  canRead, 
  canUpdate, 
  canDelete, 
  canManage,
  isRoleHigher,
  isRoleEqualOrHigher,
  UserRole
} from '@/lib/permissions';

export function usePermissions() {
  const { userData } = useAuth();
  const userRole = (userData?.role as UserRole) || 'user';

  const checkPermission = (resource: string, action: string): boolean => {
    switch (action) {
      case 'create':
        return canCreate(userRole, resource as any);
      case 'read':
        return canRead(userRole, resource as any);
      case 'update':
        return canUpdate(userRole, resource as any);
      case 'delete':
        return canDelete(userRole, resource as any);
      case 'manage':
        return canManage(userRole, resource as any);
      default:
        return false;
    }
  };

  const canCreateTask = () => checkPermission('tasks', 'create');
  const canReadTask = () => checkPermission('tasks', 'read');
  const canUpdateTask = () => checkPermission('tasks', 'update');
  const canDeleteTask = () => checkPermission('tasks', 'delete');

  const canCreateProject = () => checkPermission('projects', 'create');
  const canReadProject = () => checkPermission('projects', 'read');
  const canUpdateProject = () => checkPermission('projects', 'update');
  const canDeleteProject = () => checkPermission('projects', 'delete');

  const canCreateWorker = () => checkPermission('workers', 'create');
  const canReadWorker = () => checkPermission('workers', 'read');
  const canUpdateWorker = () => checkPermission('workers', 'update');
  const canDeleteWorker = () => checkPermission('workers', 'delete');

  const canCreateReport = () => checkPermission('reports', 'create');
  const canReadReport = () => checkPermission('reports', 'read');
  const canUpdateReport = () => checkPermission('reports', 'update');
  const canDeleteReport = () => checkPermission('reports', 'delete');

  const canManageCompany = () => checkPermission('company', 'manage');
  const canManageSettings = () => checkPermission('settings', 'manage');

  const isHigherRole = (targetRole: UserRole) => isRoleHigher(userRole, targetRole);
  const isEqualOrHigherRole = (targetRole: UserRole) => isRoleEqualOrHigher(userRole, targetRole);

  return {
    userRole,
    checkPermission,
    canCreateTask,
    canReadTask,
    canUpdateTask,
    canDeleteTask,
    canCreateProject,
    canReadProject,
    canUpdateProject,
    canDeleteProject,
    canCreateWorker,
    canReadWorker,
    canUpdateWorker,
    canDeleteWorker,
    canCreateReport,
    canReadReport,
    canUpdateReport,
    canDeleteReport,
    canManageCompany,
    canManageSettings,
    isHigherRole,
    isEqualOrHigherRole,
  };
}