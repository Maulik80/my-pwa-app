import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types/user.types';
import { DEMO_CREDENTIALS } from '../lib/constants';

interface AuthStore {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsSuperAdmin: () => void;
  loginAsAdmin: () => void;
  loginAsViewer: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const { superAdmin, admin } = DEMO_CREDENTIALS;

        if (email === superAdmin.email && password === superAdmin.password) {
          const user: User = {
            id: 'sa1',
            name: superAdmin.name,
            email: superAdmin.email,
            role: 'super_admin',
          };
          set({ user, role: 'super_admin', isAuthenticated: true, isLoading: false });
          return true;
        }

        if (email === admin.email && password === admin.password) {
          const user: User = {
            id: 'a1',
            name: admin.name,
            email: admin.email,
            role: 'admin',
          };
          set({ user, role: 'admin', isAuthenticated: true, isLoading: false });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      loginAsSuperAdmin: () => {
        const user: User = {
          id: 'sa1',
          name: DEMO_CREDENTIALS.superAdmin.name,
          email: DEMO_CREDENTIALS.superAdmin.email,
          role: 'super_admin',
        };
        set({ user, role: 'super_admin', isAuthenticated: true });
      },

      loginAsAdmin: () => {
        const user: User = {
          id: 'a1',
          name: DEMO_CREDENTIALS.admin.name,
          email: DEMO_CREDENTIALS.admin.email,
          role: 'admin',
        };
        set({ user, role: 'admin', isAuthenticated: true });
      },

      loginAsViewer: () => {
        const user: User = {
          id: 'v1',
          name: 'Viewer',
          email: 'viewer@skpt.com',
          role: 'viewer',
        };
        set({ user, role: 'viewer', isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: 'skpt-auth',
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
