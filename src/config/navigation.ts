import type { UserRole } from '../types/user.types';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
  roles: UserRole[];
}

export const navigation: Record<UserRole, NavItem[]> = {
  super_admin: [
    { path: '/super-admin', label: 'Dashboard', icon: 'home', roles: ['super_admin'] },
    { path: '/super-admin/tournaments', label: 'Tournaments', icon: 'trophy', roles: ['super_admin'] },
    { path: '/super-admin/teams', label: 'Teams', icon: 'users', roles: ['super_admin'] },
    { path: '/super-admin/matches', label: 'Matches', icon: 'calendar', roles: ['super_admin'] },
    { path: '/super-admin/admin-roles', label: 'Admin Roles', icon: 'shield', roles: ['super_admin'] },
  ],
  admin: [
    { path: '/admin', label: 'Dashboard', icon: 'home', roles: ['admin'] },
    { path: '/admin/matches', label: 'Matches', icon: 'calendar', roles: ['admin'] },
  ],
  viewer: [
    { path: '/viewer', label: 'Dashboard', icon: 'home', roles: ['viewer'] },
    { path: '/viewer/live-matches', label: 'Live Matches', icon: 'activity', roles: ['viewer'] },
    { path: '/viewer/tournaments', label: 'Tournaments', icon: 'trophy', roles: ['viewer'] },
    { path: '/viewer/points-table', label: 'Points Table', icon: 'table', roles: ['viewer'] },
    { path: '/viewer/teams', label: 'Teams', icon: 'users', roles: ['viewer'] },
  ],
};

export function getNavigationForRole(role: UserRole | null): NavItem[] {
  if (!role) return [];
  return navigation[role];
}
