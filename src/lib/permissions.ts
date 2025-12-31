import { Role } from '@prisma/client';

export type Permission =
  | 'create_contract'
  | 'view_contract'
  | 'edit_contract'
  | 'delete_contract'
  | 'approve_contract'
  | 'view_audit'
  | 'manage_users'
  | 'manage_templates';

const rolePermissions: Record<Role, Permission[]> = {
  ADMIN: [
    'create_contract',
    'view_contract',
    'edit_contract',
    'delete_contract',
    'approve_contract',
    'view_audit',
    'manage_users',
    'manage_templates',
  ],
  LEGAL: [
    'create_contract',
    'view_contract',
    'edit_contract',
    'approve_contract',
    'view_audit',
    'manage_templates',
  ],
  FINANCE: [
    'view_contract',
    'approve_contract',
    'view_audit',
  ],
  SIGNER: [
    'view_contract',
  ],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return rolePermissions[userRole]?.includes(permission) ?? false;
}

export function canAccessContract(userRole: Role, contractOwnerId?: string, userId?: string): boolean {
  if (userRole === 'ADMIN') return true;
  if (contractOwnerId === userId) return true;
  return hasPermission(userRole, 'view_contract');
}

export function canApproveContract(userRole: Role): boolean {
  return hasPermission(userRole, 'approve_contract');
}

export function canManageUsers(userRole: Role): boolean {
  return hasPermission(userRole, 'manage_users');
}