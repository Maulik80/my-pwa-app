import { useAuthStore } from '../stores/useAuthStore';
import { hasPermission, type Permission } from '../lib/permissions';

export function usePermissions() {
  const { role } = useAuthStore();

  return {
    can: (permission: Permission) => hasPermission(role, permission),
    role,
  };
}
