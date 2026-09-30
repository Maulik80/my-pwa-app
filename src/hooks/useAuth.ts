import { useAuthStore } from '../stores/useAuthStore';

export function useAuth() {
  const { user, role, isAuthenticated, isLoading, login, loginAsSuperAdmin, loginAsAdmin, loginAsViewer, logout } = useAuthStore();

  return {
    user,
    role,
    isAuthenticated,
    isLoading,
    login,
    loginAsSuperAdmin,
    loginAsAdmin,
    loginAsViewer,
    logout,
  };
}
