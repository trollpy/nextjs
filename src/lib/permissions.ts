import { ROLES } from './constants';

export type UserRole = 'admin' | 'manager' | 'user' | 'viewer';

interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  manage: boolean;
}

interface ResourcePermissions {
  tasks: Permission;
  projects: Permission;
  workers: Permission;
  reports: Permission;
  company: Permission;
  settings: Permission;
}

const rolePermissions: Record<UserRole, ResourcePermissions> = {
  admin: {
    tasks: { create: true, read: true, update: true, delete: true, manage: true },
    projects: { create: true, read: true, update: true, delete: true, manage: true },
    workers: { create: true, read: true, update: true, delete: true, manage: true },
    reports: { create: true, read: true, update: true, delete: true, manage: true },
    company: { create: true, read: true, update: true, delete: true, manage: true },
    settings: { create: true, read: true, update: true, delete: true, manage: true },
  },
  manager: {
    tasks: { create: true, read: true, update: true, delete: true, manage: true },
    projects: { create: true, read: true, update: true, delete: true, manage: true },
    workers: { create: true, read: true, update: true, delete: false, manage: true },
    reports: { create: true, read: true, update: true, delete: false, manage: true },
    company: { create: false, read: true, update: false, delete: false, manage: false },
    settings: { create: false, read: true, update: false, delete: false, manage: false },
  },
  user: {
    tasks: { create: true, read: true, update: true, delete: false, manage: false },
    projects: { create: false, read: true, update: false, delete: false, manage: false },
    workers: { create: false, read: true, update: false, delete: false, manage: false },
    reports: { create: false, read: true, update: false, delete: false, manage: false },
    company: { create: false, read: true, update: false, delete: false, manage: false },
    settings: { create: false, read: false, update: false, delete: false, manage: false },
  },
  viewer: {
    tasks: { create: false, read: true, update: false, delete: false, manage: false },
    projects: { create: false, read: true, update: false, delete: false, manage: false },
    workers: { create: false, read: true, update: false, delete: false, manage: false },
    reports: { create: false, read: true, update: false, delete: false, manage: false },
    company: { create: false, read: true, update: false, delete: false, manage: false },
    settings: { create: false, read: false, update: false, delete: false, manage: false },
  },
};

export function hasPermission(
  role: UserRole,
  resource: keyof ResourcePermissions,
  action: keyof Permission
): boolean {
  return rolePermissions[role]?.[resource]?.[action] ?? false;
}

export function canCreate(role: UserRole, resource: keyof ResourcePermissions): boolean {
  return hasPermission(role, resource, 'create');
}

export function canRead(role: UserRole, resource: keyof ResourcePermissions): boolean {
  return hasPermission(role, resource, 'read');
}

export function canUpdate(role: UserRole, resource: keyof ResourcePermissions): boolean {
  return hasPermission(role, resource, 'update');
}

export function canDelete(role: UserRole, resource: keyof ResourcePermissions): boolean {
  return hasPermission(role, resource, 'delete');
}

export function canManage(role: UserRole, resource: keyof ResourcePermissions): boolean {
  return hasPermission(role, resource, 'manage');
}

export function getRoleLevel(role: UserRole): number {
  return ROLES.find(r => r.value === role)?.level || 0;
}

export function isRoleHigher(currentRole: UserRole, targetRole: UserRole): boolean {
  return getRoleLevel(currentRole) > getRoleLevel(targetRole);
}

export function isRoleEqualOrHigher(currentRole: UserRole, targetRole: UserRole): boolean {
  return getRoleLevel(currentRole) >= getRoleLevel(targetRole);
}