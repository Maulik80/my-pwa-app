import type { UserRole } from '../types/user.types';

export type Permission =
  | 'view_dashboard'
  | 'view_tournaments'
  | 'create_tournament'
  | 'edit_tournament'
  | 'view_teams'
  | 'create_team'
  | 'edit_team'
  | 'view_matches'
  | 'create_match'
  | 'edit_match'
  | 'live_scoring'
  | 'view_points_table'
  | 'manage_admin_roles'
  | 'assign_scorer'
  | 'view_match_details';

const rolePermissions: Record<UserRole, Permission[]> = {
  super_admin: [
    'view_dashboard',
    'view_tournaments',
    'create_tournament',
    'edit_tournament',
    'view_teams',
    'create_team',
    'edit_team',
    'view_matches',
    'create_match',
    'edit_match',
    'live_scoring',
    'view_points_table',
    'manage_admin_roles',
    'assign_scorer',
    'view_match_details',
  ],
  admin: [
    'view_dashboard',
    'view_tournaments',
    'view_teams',
    'view_matches',
    'live_scoring',
    'view_points_table',
    'view_match_details',
  ],
  viewer: [
    'view_dashboard',
    'view_tournaments',
    'view_teams',
    'view_matches',
    'view_points_table',
    'view_match_details',
  ],
};

export function hasPermission(role: UserRole | null, permission: Permission): boolean {
  if (!role) return false;
  return rolePermissions[role].includes(permission);
}

export function canCreateTournament(role: UserRole | null): boolean {
  return hasPermission(role, 'create_tournament');
}

export function canEditTournament(role: UserRole | null): boolean {
  return hasPermission(role, 'edit_tournament');
}

export function canCreateTeam(role: UserRole | null): boolean {
  return hasPermission(role, 'create_team');
}

export function canEditTeam(role: UserRole | null): boolean {
  return hasPermission(role, 'edit_team');
}

export function canCreateMatch(role: UserRole | null): boolean {
  return hasPermission(role, 'create_match');
}

export function canEditMatch(role: UserRole | null): boolean {
  return hasPermission(role, 'edit_match');
}

export function canDoLiveScoring(role: UserRole | null): boolean {
  return hasPermission(role, 'live_scoring');
}

export function canManageAdminRoles(role: UserRole | null): boolean {
  return hasPermission(role, 'manage_admin_roles');
}

export function canAssignScorer(role: UserRole | null): boolean {
  return hasPermission(role, 'assign_scorer');
}
